import AdmZip from 'adm-zip';
import { I18nConfig, LoadContext, Plugin, PluginOptions } from '@docusaurus/types';
import crowdin, { Credentials, ResponseObject, SourceFiles, SourceFilesModel, UploadStorage } from '@crowdin/crowdin-api-client';
import path from 'path';
import fs from 'fs';
import logger from '@docusaurus/logger';
import { finished } from "stream/promises";
import { Readable } from 'stream';
import { ReadableStream } from 'stream/web';
import matter from 'gray-matter';
import { safeGlobby } from '@docusaurus/utils';
import crypto from 'crypto';
import retry from 'retry';

type TranslationJson = {
    [key: string]: {
        message: string,
        description?: string,
    };
}

type Locales = {
    defaultLocale: string,
    locales: string[],
    path: string,
    localeConfigs: { 
        [locale: string]: { 
            path: string 
        } 
    },
}

type MarkdownFolders = {
    path: string,
    destination: string,
}[];

const PLUGIN_NAME = 'docusaurus-plugin-crowdin-sync';

const crowdinSyncPlugin = (context: LoadContext, options: PluginOptions): Plugin => {
    return {
        name: PLUGIN_NAME,
        extendCli(cli) {
            cli
                .command('crowdin-sync')
                .description('Sync translations with Crowdin')
                .action(async () => {
                    const pluginDir = path.join(context.generatedFilesDir, PLUGIN_NAME);

                    const credentials: Credentials = {
                        token: process.env.CROWDIN_TOKEN || '',
                        organization: process.env.CROWDIN_ORGANIZATION,
                    };
                    const crowdinClient = new crowdin(credentials);
                    const projectId = options.projectId as number;

                    const locales = populateLocales({ i18n: context.siteConfig.i18n });
                    const markdownFolders = options.markdownFolders as MarkdownFolders;

                    await uploadAction({ context, options, crowdinClient, projectId, pluginDir, locales, markdownFolders });
                    logger.info('Uploaded files to Crowdin');

                    await downloadAction({ context, options, crowdinClient, projectId, pluginDir, locales, markdownFolders });
                    logger.info('Downloaded translations from Crowdin');
                })
        },
    }
};

const uploadAction = async (inp: {
    context: LoadContext,
    options: PluginOptions,
    crowdinClient: crowdin,
    projectId: number,
    pluginDir: string,
    locales: Locales,
    markdownFolders: MarkdownFolders,
}) => {
    const { context, options, crowdinClient, projectId, pluginDir, locales, markdownFolders } = inp;
    const { uploadStorageApi, sourceFilesApi } = crowdinClient;

    const unprocessedFiles = new Set<string>();

    const markdownFiles = await safeGlobby(
        markdownFolders.map(s => path.join(context.siteDir, s.path)),
        { expandDirectories: ['**/*.{md,mdx}'] }
    );

    const markdownSyncedMap = new Map<string, { file: string, content: string }>();

    for (const file of markdownFiles) {
        let content = fs.readFileSync(file, 'utf8');
        const parsed = matter(content);
        const data = parsed.data || {};

        if (!data.crowdin_page_id) {
            data.crowdin_page_id = crypto.randomUUID();
            content = matter.stringify(parsed.content, data);
            fs.writeFileSync(file, content);
        }

        if (!data.crowdin_sync) continue;

        markdownSyncedMap.set(data.crowdin_page_id, { file, content });
        unprocessedFiles.add(file);
    }

    const jsonFolder = path.join(locales.path, locales.localeConfigs[locales.defaultLocale].path);
    const jsonFiles = await safeGlobby(
        [path.join(context.siteDir, jsonFolder)],
        { expandDirectories: ['**/*.json'] }
    );

    for (const file of jsonFiles) {
        unprocessedFiles.add(file);
    }

    if (!fs.existsSync(pluginDir)) {
        fs.mkdirSync(pluginDir, { recursive: true });
    }

    const files = await fetchPaginatedCrowdinData<ResponseObject<SourceFilesModel.File>>(
        sourceFilesApi.listProjectFiles.bind(sourceFilesApi),
        projectId
    );

    const directories = await fetchPaginatedCrowdinData<ResponseObject<SourceFilesModel.Directory>>(
        sourceFilesApi.listProjectDirectories.bind(sourceFilesApi),
        projectId
    );

    const markdownOptions: {
        importOptions: SourceFilesModel.ImportOptions,
        exportOptions: SourceFilesModel.ExportOptions,
    } = {
        importOptions: {
            excludedFrontMatterElements: ['permalink', 'page_sidebar', 'hide_title'],
            excludeCodeBlocks: true,
        },
        exportOptions: {
            strongMarker: 'asterisk',
            emphasisMarker: 'asterisk',
        },
    }

    for (const file of files) {
        const filePath = path.join(pluginDir, file.data.path);
        const fileDir = path.dirname(filePath);

        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }

        const downloadFileData = await sourceFilesApi.downloadFile(projectId, file.data.id);
        await downloadFile({ url: downloadFileData.data.url, filePath });

        const content = fs.readFileSync(filePath, 'utf8');
        let remove = false;
        let crowdinContentHash = '';

        switch (path.extname(filePath)) {
            case '.json':
                const relativeJsonPath = file.data.path.slice(1);
                if (!unprocessedFiles.delete(relativeJsonPath)) {
                    remove = true;
                    break;
                }

                await updateCrowdinFileDirectory({
                    projectId,
                    sourceFilesApi,
                    file,
                    directories,
                    finalPath: path.resolve('/', file.data.path),
                });

                crowdinContentHash = crypto.createHash('sha256').update(content).digest('hex');
                const jsonContent = processJsonContent(fs.readFileSync(relativeJsonPath, 'utf8'), options.jsonKeyExclusions as string[]);
                const jsonHash = crypto.createHash('sha256').update(jsonContent).digest('hex');

                if (jsonHash === crowdinContentHash) break;

                await updateCrowdinFile({
                    projectId,
                    sourceFilesApi,
                    file,
                    content: jsonContent,
                    filePath: relativeJsonPath,
                    uploadStorageApi,
                });

                break;

            case '.md':
            case '.mdx':
                const parsed = matter(content);
                const data = parsed.data || {};

                if (!data.crowdin_page_id) throw new Error(`Missing crowdin_page_id in MD/MDX frontmatter for ${filePath}`);

                const synced = markdownSyncedMap.get(data.crowdin_page_id);
                unprocessedFiles.delete(synced.file);

                if (!synced) {
                    remove = true;
                    break;
                }

                await updateCrowdinFileDirectory({
                    projectId,
                    sourceFilesApi,
                    file,
                    directories,
                    finalPath: path.resolve('/', synced.file),
                });

                crowdinContentHash = crypto.createHash('sha256').update(content).digest('hex');
                const syncedHash = crypto.createHash('sha256').update(synced.content).digest('hex');

                if (syncedHash === crowdinContentHash) break;

                await updateCrowdinFile({
                    projectId,
                    sourceFilesApi,
                    file,
                    content: synced.content,
                    filePath: synced.file,
                    uploadStorageApi,
                    ...markdownOptions,
                });
        }

        if (remove) {
            await sourceFilesApi.deleteFile(projectId, file.data.id);
        }
    }

    for (const file of unprocessedFiles) {
        const filePath = path.join(context.siteDir, file);

        const fileOptions: {
            importOptions?: SourceFilesModel.ImportOptions,
            exportOptions?: SourceFilesModel.ExportOptions,
            type?: SourceFilesModel.FileType,
        } = {};

        let content: string;
        switch (path.extname(file)) {
            case '.json':
                fileOptions.type = 'json';
                content = processJsonContent(fs.readFileSync(filePath, 'utf8'), options.jsonKeyExclusions as string[]);
                break;

            case '.md':
                fileOptions.type = 'md';
                fileOptions.importOptions = markdownOptions.importOptions;
                fileOptions.exportOptions = markdownOptions.exportOptions;
                content = fs.readFileSync(filePath, 'utf8');
                break;

            case '.mdx':
                fileOptions.type = 'mdx_v2' as SourceFilesModel.FileType;
                fileOptions.importOptions = markdownOptions.importOptions;
                fileOptions.exportOptions = markdownOptions.exportOptions;
                content = fs.readFileSync(filePath, 'utf8');
                break;
        }

        const directoryId = await createCrowdinDirectory({
            projectId,
            sourceFilesApi,
            directories,
            finalDir: path.dirname(file),
        });

        const storage = await uploadStorageApi.addStorage(path.basename(file), content);

        await sourceFilesApi.createFile(projectId, {
            storageId: storage.data.id,
            name: path.basename(file),
            directoryId,
            ...fileOptions,
        });
    }
};

const downloadAction = async (inp: {
    context: LoadContext,
    options: PluginOptions,
    crowdinClient: crowdin,
    projectId: number,
    pluginDir: string,
    locales: Locales,
    markdownFolders: MarkdownFolders,
}) => {
    const { context, options, crowdinClient, projectId, pluginDir, locales, markdownFolders } = inp;
    const { translationsApi } = crowdinClient;

    const build = await translationsApi.buildProject(projectId);
    
    let retries = 0;

    while (retries < 60) {
        const status = await translationsApi.checkBuildStatus(projectId, build.data.id);
        logger.info(`Translation bundle build status: ${status.data.status}`);
        if (status.data.status === 'finished') break;
        if (status.data.status === 'failed') {
            throw new Error('Translations build failed');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        retries++;
    }

    const translations = await translationsApi.downloadTranslations(projectId, build.data.id);
    const zipPath = path.join(pluginDir, 'translations.zip');
    await downloadFile({ url: translations.data.url, filePath: zipPath });
    const zip = new AdmZip(zipPath);


    for (const entry of zip.getEntries()) {
        if (entry.isDirectory) continue;

        const entryParts = entry.entryName.split('/');
        if (entryParts.length < 2) continue;

        const locale = entryParts[0];
        if (locale === locales.defaultLocale) continue;

        const entryPath = entryParts.slice(1).join('/');

        if (entryPath.startsWith(path.join(locales.path, '/'))) {
            const destinationPath = path.join(
                context.siteDir, 
                locales.path, 
                locales.localeConfigs[locale].path, 
                entryPath.slice(locales.path.length + locales.localeConfigs[locales.defaultLocale].path.length + 1)
            );

            const destinationDir = path.dirname(destinationPath);
            if (!fs.existsSync(destinationDir)) {
                fs.mkdirSync(destinationDir, { recursive: true });
            }

            zip.extractEntryTo(entry, destinationDir, false, true);
            continue;
        }

        const markdownFolder = markdownFolders.find(f => entryPath.startsWith(path.join(f.path, '/')));
        if (markdownFolder) {
            const destinationPath = path.join(
                context.siteDir, 
                locales.path, 
                locales.localeConfigs[locale].path, 
                markdownFolder.destination,
                entryPath.slice(markdownFolder.path.length)
            );

            const destinationDir = path.dirname(destinationPath);
            if (!fs.existsSync(destinationDir)) {
                fs.mkdirSync(destinationDir, { recursive: true });
            }

            zip.extractEntryTo(entry, destinationDir, false, true);
            continue;
        }
    }
};

const populateLocales = (inp: { i18n: I18nConfig }): Locales => {
    const { i18n } = inp;

    const defaultLocale = i18n.defaultLocale ?? 'en';
    const locales = i18n.locales ?? [defaultLocale];
    const localePath = i18n.path ?? 'i18n';

    const localeConfigs: { [locale: string]: { path: string } } = {};
    for (const locale of locales) {
        localeConfigs[locale] = {
            path: (i18n.localeConfigs[locale] ?? {}).path ?? locale,
        };
    }

    return {
        defaultLocale,
        locales,
        path: localePath,
        localeConfigs,
    }
};

const processJsonContent = (content: string, exclusions: string[]): string => {
    const jsonContent: TranslationJson = JSON.parse(content);
    const includedContent: TranslationJson = {};
    for (const key in jsonContent) {
        for (const exclusion in exclusions) {
            if (key.startsWith(exclusion)) {
                continue;
            }
            includedContent[key] = jsonContent[key];
        }
    }
    return JSON.stringify(includedContent, null, 2);
};

const fetchPaginatedCrowdinData = async <T>(
    apiMethod: (projectId: number, params: { limit: number, offset: number }) => Promise<{ data: T[] }>,
    projectId: number
): Promise<T[]> => {
    const limit = 500;
    let offset = 0;
    let remaining = true;
    const results: T[] = [];

    while (remaining) {
        const response = await apiMethod(projectId, { limit, offset });

        if (response.data.length < limit) {
            remaining = false;
        } else {
            offset += limit;
        }

        results.push(...response.data);
    }

    return results;
};

const downloadFile = async (inp: { url: string, filePath: string }) => {
    const { url, filePath } = inp;
    logger.info(`Downloading translation file to ${filePath}`);
    const { body } = await fetch(url);
    const stream = fs.createWriteStream(filePath);
    await finished(Readable.fromWeb(body as ReadableStream<any>).pipe(stream));
};

const updateCrowdinFile = async (inp: {
    projectId: number,
    sourceFilesApi: SourceFiles,
    file: ResponseObject<SourceFilesModel.File>,
    content: string,
    filePath: string,
    uploadStorageApi: UploadStorage,
    importOptions?: SourceFilesModel.ImportOptions,
    exportOptions?: SourceFilesModel.ExportOptions,
}) => {
    const { projectId, sourceFilesApi, file, content, filePath, uploadStorageApi, importOptions, exportOptions } = inp;

    const storage = await uploadStorageApi.addStorage(path.basename(filePath), content);

    await sourceFilesApi.updateOrRestoreFile(projectId, file.data.id, {
        storageId: storage.data.id,
        name: path.basename(filePath),
        updateOption: 'clear_translations_and_approvals',
        importOptions,
        exportOptions
    })
};

const updateCrowdinFileDirectory = async (inp: {
    projectId: number,
    sourceFilesApi: SourceFiles,
    file: ResponseObject<SourceFilesModel.File>,
    directories: ResponseObject<SourceFilesModel.Directory>[],
    finalPath: string,
}) => {
    const { projectId, sourceFilesApi, file, directories, finalPath } = inp;

    if (finalPath === file.data.path) return;

    const parentDirId = await createCrowdinDirectory({
        projectId,
        sourceFilesApi,
        directories,
        finalDir: path.dirname(finalPath),
    });

    await sourceFilesApi.editFile(projectId, file.data.id, [
        {
            op: 'replace',
            path: '/directoryId',
            value: parentDirId,
        }
    ])
};

const createCrowdinDirectory = async (inp: {
    projectId: number,
    sourceFilesApi: SourceFiles,
    directories: ResponseObject<SourceFilesModel.Directory>[],
    finalDir: string,
}) => {
    const { projectId, sourceFilesApi, directories, finalDir } = inp;

    const pathArr = finalDir.split('/');
    const remainingDirs: string[] = [];
    let parentDirId: number = null;

    for (let i = pathArr.length; i > 0; i--) {
        const dirPath = path.join('/', pathArr.slice(0, i).join('/'));
        const dir = directories.find(d => d.data.path === dirPath);

        if (dir) {
            parentDirId = dir.data.id;
            if (i === pathArr.length) {
                return parentDirId;
            }
            break;
        }

        remainingDirs.unshift(pathArr[i - 1]);
    }

    for (const dir of remainingDirs) {
        const newDir = await sourceFilesApi.createDirectory(projectId, {
            name: dir,
            directoryId: parentDirId ?? undefined,
        });

        directories.push(newDir);
        parentDirId = newDir.data.id;
    }

    return parentDirId;
}

export default crowdinSyncPlugin;
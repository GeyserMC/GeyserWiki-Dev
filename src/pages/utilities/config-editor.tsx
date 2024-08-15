import Translate from '@docusaurus/Translate';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.webp';
import Layout from '@theme/Layout';
import styles from './utilities.module.scss';
import { useRef, useState } from 'react';
import {renderToString} from "react-dom/server";

const ConfigEditorPage: React.FC = () => {
    const [config, setConfig] = useState('');
    const [parsedConfig, setParsedConfig] = useState<any>({});
    // match optional key
    const keyReg = /^#? ?[^:\sA-Z]+:(?!\S)/
    const editedConfig = useRef<any>({});
    const uploadRef = useRef<any>(null);

    const loadDefault = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/GeyserMC/Geyser/master/core/src/main/resources/config.yml');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            handleConfigLoad(text);
        } catch (error) {
            console.error('Failed to fetch default config:', error);
        }
    }

    const handleUpload = async (e) => {
        const fileName = e.target.files[0];

        // Makse sure the file is a .yml file
        if (!fileName.name.endsWith('.yml')) {
            alert('Please select a .yml config file!');
            return;
        }

        // Read the file
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            handleConfigLoad(e.target.result as string);
        }
        fileReader.readAsText(fileName);
    }

    const handleConfigLoad = (config: string) => {
        setConfig(config);
        setParsedConfig(loadConfig(config));
    }

    const loadConfig = (config: string) => {
        const lines = config.split('\n');
        let currentSection = '';
        let currentComment = '';

        const newConfig = {};

        // Parse each line of the config
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            // Reset the section if we are no indented
            if (!line.startsWith('  ')) {
                currentSection = '';
            }

            // Ignore any empty lines
            line = line.trim()
            if (line === '') {
                currentComment = '';
                continue;
            }

            const commented = line.startsWith('#');

            const match = line.match(keyReg)
            if (match === null) {
                // Check if we are in a comment
                if (commented) {
                    currentComment += line.replace(/^# ?/i, '') + '<br>';
                }
                continue;
            }

            // Check if we are in a new section
            if (line.endsWith(':')) {
                currentSection = line.replace(':', '');
                currentComment = '';
                continue;
            }

            // Ignore user auths section
            if (currentSection === 'saved-user-logins') {
                continue;
            }

            // Get the key and value
            const splitLine = line.split(':');
            splitLine[0] = splitLine[0].trim();
            let val = '';
            for (let j = 1;j<splitLine.length;j++) {
                val += splitLine[j];
            }
            val = val.trim();
            /*
            if (splitLine[0].includes('proxy-protocol-whitelisted-ips')) {
                currentComment = '';
                continue;
            }
             */

            if (commented) {
                currentComment += '<strong>Note: This option is commented on, and if you change it, it will be automatically uncommented.</strong>' + '<br>';
            }

            // Add the config option to the config object
            newConfig[currentSection] = newConfig[currentSection] || {};
            newConfig[currentSection][splitLine[0]] = {
                desc: currentComment,
                value: val,
                line: i
            };

            // Reset the comment
            currentComment = '';
        }
        return newConfig;
    }

    const generateHTML = (config: any) => {
        return Object.keys(config).map(configKey => (
            <div key={configKey} className={styles.card}>
                <div className={styles.cardHeader}>{configKey === '' ? 'Root' : configKey}</div>
                <div className={styles.cardBody}>
                    {Object.keys(config[configKey]).map(configOption => {
                        const configOptionInfo = config[configKey][configOption];
                        const configOptionKey = configKey === '' ? configOption : `${configKey}.${configOption}`;
                        const showOptionName = configOption.replace('#','').trim()
                        return (
                            <div key={configOptionKey} className={styles.configOption}>
                                <h3>{showOptionName}</h3>
                                <p dangerouslySetInnerHTML={{ __html: configOptionInfo.desc }} />
                                {getInput(configOptionKey, configOptionInfo.value)}
                            </div>
                        )
                    })}
                </div>
            </div>
        ))
    }

    const handleExport = () => {
        let newConfig = config;
        const lines = newConfig.split('\n');
        Object.entries(editedConfig.current).forEach(([key, value]) => {
            const keys = key.split('.');
            let currentObj = parsedConfig;

            keys.forEach((nestedKey, index) => {
                if (currentObj.hasOwnProperty(nestedKey)) {
                    if (index === keys.length - 1) {
                        const option = currentObj[nestedKey];
                        const oldValue = option.value;
                        const index = option.line;
                        const newKey = nestedKey.replace('#','').trim();
                        lines[index] = lines[index].replace(`  ${nestedKey}: ${oldValue}`,`  ${newKey}: ${value}`);
                    } else {
                        currentObj = currentObj[nestedKey];
                    }
                }
            });
        });
        newConfig = lines.join('\n');

        // Trigger a download of the final config
        downloadString(newConfig, 'text/plain', 'config.yml');
    }

    function getInput(name, value) {
        const handleChange = (event) => {
            const {id, value, type, checked} = event.target;

            editedConfig.current = {
                ...editedConfig.current,
                [id]: type === 'checkbox' ? checked.toString() : value
            };
        }

        const listInputIdMap = {
            'bedrock.proxy-protocol-whitelisted-ips': 0
        }

        const addInput = (id) => {
            let parentNode = document.getElementById(id);
            const name = id.replace('listEditor_','');
            let index = listInputIdMap[name];
            let inputId = "listInput_" + name + index;
            index++;
            const node = document.createRange().createContextualFragment(
                renderToString(<div><input id={inputId} key={name} className={styles.listInput} type='text'
                              defaultValue='' onChange={handleChange}/>
                    <button onClick={e => removeInput(e.target)}>
                        <i className="fa">&#10006;</i></button>
            </div>));
            parentNode.appendChild(node);
            let elements = parentNode.getElementsByTagName("button")
            let button = elements[elements.length - 1] as HTMLButtonElement;
            button.onclick = (e) => removeInput(e.target);
            handleListEditorChange(0,inputId);
        }

        const removeInput = (button): any=> {
            let parent = button.parentElement;
            while (parent.nodeName.toLowerCase() != 'div') {
                console.log(parent.nodeName)
                parent = parent.parentElement;
            }
            parent.remove();
            handleListEditorChange(0,parent.firstElementChild.id);
        };

        const handleListEditorChange = (type,id)=> {
            switch (type) {
                // add
                case 0:
                    
                // remove
                case 1:
                // input
                case 2:
            }
        };


        switch (name) {
            // Handle all the dropdowns
            case 'remote.auth-type':
                return (
                    <select key={name} className={styles.formInput} id={name} defaultValue={value} onChange={handleChange}>
                        <option value='offline'>offline</option>
                        <option value='online'>online</option>
                        <option value='floodgate'>floodgate</option>
                    </select>
                );
            case 'show-cooldown':
                return (
                    <select key={name} className={styles.formInput} id={name} defaultValue={value} onChange={handleChange}>
                        <option value='title'>title</option>
                        <option value='actionbar'>actionbar</option>
                        <option value='false'>false</option>
                    </select>
                );
            case 'emote-offhand-workaround':
                return (
                    <select key={name} className={styles.formInput} id={name} defaultValue={value} onChange={handleChange}>
                        <option value='disabled'>disabled</option>
                        <option value='no-emotes'>no-emotes</option>
                        <option value='emotes-and-offhand'>emotes-and-offhand</option>
                    </select>
                );
            case 'config-version':
                return <input key={name} className={styles.formInput} type='text' disabled defaultValue={value.replace(/"/g, '')} />;
            case 'metrics.uuid':
                return <input key={name} className={styles.formInput} id={name} type='text' disabled defaultValue={value === 'generateduuid' ? crypto.randomUUID() : value} />;
            case 'bedrock.#proxy-protocol-whitelisted-ips':
            case 'bedrock.proxy-protocol-whitelisted-ips':
                const arr = JSON.parse(value);
                let re = [];
                let id = '';
                let str = name.replace('#','');
                for (let i = 0; i < arr.length; i++) {
                    let content = arr[i];
                    let index = listInputIdMap[str];
                    id = "listInput_" + name + index;
                    index++;
                    re[i] = <div><input id={id} key={name} className={styles.listInput} type='text'
                                        defaultValue={content.replace(/"/g, '')} onChange={handleChange}/>
                        <button onClick={e=>removeInput(e.target)}><i className="fa">&#10006;</i></button></div>;
                }
                id = 'listEditor_' + str;
                return [<div id={id}>{re}</div>,
                <button className={styles.widerButton} onClick={e => addInput(id)}>Add</button>];
            default:
                // Handle all the other inputs
                if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                    // Boolean
                    return (
                        <div key={name}>
                            <input className={styles.checkbox} type='checkbox' id={name}
                                   defaultChecked={value.toLowerCase() === 'true'} onChange={handleChange}/>
                            <label htmlFor={name} className='switch'></label>
                        </div>
                    );
                } else if (!isNaN(value)) {
                    // Number
                    return <input key={name} className={styles.formInput} type='number' defaultValue={value}
                                  id={name} onChange={handleChange}/>;
                } else {
                    // String
                    return <input key={name} className={styles.formInput} type='text'
                                  defaultValue={value.replace(/"/g, '')} id={name} onChange={handleChange}/>;
                }
        }
    }

    // From https://gist.github.com/danallison/3ec9d5314788b337b682
    function downloadString(text, fileType, fileName) {
        const blob = new Blob([text], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = URL.createObjectURL(blob)
        a.dataset.downloadurl = [fileType, a.download, a.href].join(':')
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        setTimeout(() => { URL.revokeObjectURL(a.href) }, 1500)
    }

    const NoConfigSection = () => (
        <>
            <h1><Translate id='pages.configeditor.noconfigselected.heading'>No config selected.</Translate></h1>
            <h3 className={styles.fontNormal}><Translate id='pages.configeditor.noconfigselected.subheading'>Upload a file or get started with the default config!</Translate></h3>

            <div className={styles.buttonsContainer}>
                <button className={styles.button} onClick={loadDefault}>
                    <Translate id='pages.configeditor.button.defaultconfig'>Default</Translate>
                </button>

                <button className={styles.button} onClick={() => uploadRef.current.click()}>
                    <input
                        ref={uploadRef}
                        type='file'
                        className={styles.hidden}
                        accept='.yml'
                        onChange={handleUpload}
                    />
                    <Translate id='pages.configeditor.button.upload'>Upload</Translate>
                </button>
            </div>
        </>
    )

    const EditorView = () => (
        <>
            <div className={styles.buttonsContainer} style={{ marginBottom: '30px' }}>
                <button className={styles.button} onClick={handleExport}>
                    <Translate id='pages.configeditor.button.export'>Export</Translate>
                </button>
            </div>
            {generateHTML(parsedConfig)}
        </>
    )

    return (
        <>
            <HeroBanner
                title={<Translate id='pages.configeditor.title'>Config Editor</Translate>}
                subheading={<Translate id='pages.configeditor.subheading'>Edit your Geyser configuration.</Translate>}
                backgroundImage={HeroBackground}
            />

            <div className='container' style={{ marginTop: '30px' }}>
                {Object.keys(parsedConfig).length === 0 ? <NoConfigSection /> : <EditorView />}
            </div>


            <section id='config-options'></section>
        </>
    )
}

export default function ConfigEditor(): JSX.Element {
    return (
        <Layout
            title={`Config Editor`}
            description='Edit your Geyser configuration.'
        >
            <main>
                <div className='container container--fluid margin-vert--lg'>
                    <ConfigEditorPage />
                </div>
            </main>
        </Layout>
    )
}

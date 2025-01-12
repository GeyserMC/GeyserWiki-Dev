import versions from '../data/versions.json';

export const Versions = {
    bedrock: () => versions.bedrock.supported,
    java: () => versions.java.supported,
};
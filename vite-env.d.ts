/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WP_GRAPHQL_ENDPOINT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

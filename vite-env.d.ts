interface ImportMetaEnv {
    readonly VITE_REACT_APP_API_BASE_URL: string;
    // Add other environment variables here...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
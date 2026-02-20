/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_API_BASE: string;
  readonly VITE_MSAL_CLIENT_ID: string;
  readonly VITE_MSAL_AUTHORITY_ID: string;
  readonly VITE_MSAL_REDIRECT_URI: string;
  readonly VITE_IS_PLAYWRIGHT: boolean;
  readonly VITE_LEGACY_API_BASE: string;
  readonly VITE_ENABLED_MODULES?: string;
  readonly VITE_AI_AGENT_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import { isTruthy } from "@/utils/misc";

export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  accessTokenPersistStrategy: "localStorage" | "sessionStorage" | "cookies";
  enableMock: boolean;
  activeNavTranslation: boolean;
  apiBase: string;
  msalClientId: string;
  msalAuthorityId: string;
  msalRedirectUri: string;
  isPlaywright?: boolean;
  legacyApiBase: string;
  nodeEnv: string;
  enabledModules: string[];
  aiAgentApiBase: string;
};

const appConfig: AppConfig = {
  apiPrefix: "/api",
  authenticatedEntryPath: "/home",
  unAuthenticatedEntryPath: "/sign-in",
  locale: "en",
  accessTokenPersistStrategy: "localStorage",
  enableMock: true,
  activeNavTranslation: false,
  nodeEnv: import.meta.env.VITE_NODE_ENV,
  apiBase: import.meta.env.VITE_API_BASE,
  msalClientId: import.meta.env.VITE_MSAL_CLIENT_ID,
  msalAuthorityId: import.meta.env.VITE_MSAL_AUTHORITY_ID,
  msalRedirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
  isPlaywright: isTruthy(import.meta.env.VITE_IS_PLAYWRIGHT) || false,
  legacyApiBase: import.meta.env.VITE_LEGACY_API_BASE,
  enabledModules: import.meta.env.VITE_ENABLED_MODULES?.split("|") || [],
  aiAgentApiBase: import.meta.env.VITE_AI_AGENT_API_BASE,
};

export default appConfig;

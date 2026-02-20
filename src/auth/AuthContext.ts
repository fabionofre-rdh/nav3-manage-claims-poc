import { createContext } from "react";
import type { OauthSignInCallbackPayload } from "@/@types/auth";
import { AccountInfo } from "@azure/msal-browser";

type Auth = {
  authenticated: boolean;
  user?: AccountInfo | null;
  signIn: () => void;
  signUp: () => void;
  signOut: () => void;
  oAuthSignIn: (callback: (payload: OauthSignInCallbackPayload) => void) => void;
};

const defaultOAuthSignInPlaceHolder = (
  callback: (payload: OauthSignInCallbackPayload) => void
): void => {
  callback({
    onSignIn: () => {},
    redirect: () => {},
  });
};

const AuthContext = createContext<Auth>({
  authenticated: false,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
  oAuthSignIn: defaultOAuthSignInPlaceHolder,
});

export default AuthContext;

import { useRef, useImperativeHandle, useCallback, useEffect } from "react";
import AuthContext from "./AuthContext";
import appConfig from "@/configs/app.config";
import { REDIRECT_URL_KEY } from "@/constants/app.constant";
import { useNavigate } from "react-router-dom";
import type { OauthSignInCallbackPayload } from "@/@types/auth";
import type { ReactNode, Ref } from "react";
import type { NavigateFunction } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";
import { setIsUserSignedIn } from "@/redux/slices/authSlice";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./msalConfig";

type AuthProviderProps = { children: ReactNode };

export type IsolatedNavigatorRef = {
  navigate: NavigateFunction;
};

const IsolatedNavigator = ({ ref }: { ref: Ref<IsolatedNavigatorRef> }) => {
  const navigate = useNavigate();

  useImperativeHandle(ref, () => {
    return {
      navigate,
    };
  }, [navigate]);

  return <></>;
};

function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { instance, accounts } = useMsal();
  const { isUserSignedIn } = useSelector((state: AppState) => state.auth);
  const isAuthenticated = appConfig.isPlaywright ? true : useIsAuthenticated();

  const authenticated = Boolean(accounts.length > 0 && isUserSignedIn);

  const navigatorRef = useRef<IsolatedNavigatorRef>(null);
  const isActivelySigningIn = useRef(false);

  const redirect = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const redirectUrl = params.get(REDIRECT_URL_KEY);

    navigatorRef.current?.navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
  };

  const handleSignIn = useCallback(async () => {
    if (isAuthenticated && accounts.length > 0) {
      dispatch(setIsUserSignedIn(true));
    }
  }, [isAuthenticated, accounts, dispatch]);

  const signIn = async () => {
    try {
      isActivelySigningIn.current = true;

      const loginResponse = await instance.loginPopup(loginRequest);

      // Set user as signed in
      dispatch(setIsUserSignedIn(true));
      redirect();
    } catch (error) {
      console.error("Failed to sign in:", error);
      throw new Error("Failed to sign in");
    } finally {
      isActivelySigningIn.current = false;
    }
  };

  const signUp = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch {
      throw new Error("Failed to sign in");
    }
  };

  const signOut = async () => {
    await instance.logoutPopup({
      mainWindowRedirectUri: "/",
      postLogoutRedirectUri: "/",
    });
  };

  const oAuthSignIn = (callback: (payload: OauthSignInCallbackPayload) => void) => {
    callback({
      onSignIn: handleSignIn,
      redirect,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user: accounts.length > 0 ? accounts[0] : null,
        signIn,
        signUp,
        signOut,
        oAuthSignIn,
      }}
    >
      {children}
      <IsolatedNavigator ref={navigatorRef} />
    </AuthContext.Provider>
  );
}

export default AuthProvider;

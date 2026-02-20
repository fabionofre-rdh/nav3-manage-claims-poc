import { loginRequest } from "@/auth/msalConfig";
import { msalInstance } from "@/auth/msalInstance";
import { AuthenticationResult, InteractionRequiredAuthError } from "@azure/msal-browser";

const getAccessToken = async (): Promise<string | null> => {
  try {
    const account = msalInstance.getActiveAccount();
    const accounts = msalInstance.getAllAccounts();
    const response: AuthenticationResult = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account || accounts[0],
    });
    return response.idToken;
  } catch (error) {
    console.log("error from security====", error);
    if (error instanceof InteractionRequiredAuthError) {
      // fallback to interaction when silent call fails
      const response: AuthenticationResult = await msalInstance.acquireTokenPopup({
        ...loginRequest,
      });
      return response.idToken;
    }
    console.error("Token acquisition failed", error);
    return null;
  }
};
export const sec = {
  getAccessToken: getAccessToken,
};

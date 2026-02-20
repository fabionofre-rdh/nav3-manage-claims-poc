import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/auth/msalInstance";
import { AuthenticationResult, EventType } from "@azure/msal-browser";
import appConfig from "./configs/app.config";

async function enableMocking() {
  if (appConfig.enableMock) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
  return;
}

msalInstance.initialize().then(() => {
  const activeAccount = msalInstance.getActiveAccount();
  // Default to using the first account if no account is active on page load
  if (!activeAccount) {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }

  // Optional - This will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const authenticationResult = event.payload as AuthenticationResult;
      const account = authenticationResult.account;
      msalInstance.setActiveAccount(account);
    }
  });

  // const container = document.getElementById("root");
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  enableMocking().then(() => {
    root.render(
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    );
  });

});

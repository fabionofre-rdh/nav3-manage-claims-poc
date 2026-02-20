import { Navigate, Outlet } from "react-router-dom";
import appConfig from "@/configs/app.config";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
  const isAuthenticated = appConfig.isPlaywright ? true : useIsAuthenticated();
  const { inProgress } = appConfig.isPlaywright
    ? { inProgress: InteractionStatus.None }
    : useMsal();

  if (inProgress !== InteractionStatus.None) {
    return null;
  }
  return isAuthenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />;
};

export default PublicRoute;

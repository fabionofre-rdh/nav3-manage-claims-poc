import appConfig from "@/configs/app.config";
import { REDIRECT_URL_KEY } from "@/constants/app.constant";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

const { unAuthenticatedEntryPath } = appConfig;

const ProtectedRoute = () => {
  const isAuthenticated = appConfig.isPlaywright ? true : useIsAuthenticated();
  const { inProgress } = appConfig.isPlaywright
    ? { inProgress: InteractionStatus.None }
    : useMsal();

  const { pathname } = useLocation();

  const getPathName = pathname === "/" ? "" : `?${REDIRECT_URL_KEY}=${location.pathname}`;

  if (inProgress !== InteractionStatus.None) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate replace to={`${unAuthenticatedEntryPath}${getPathName}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

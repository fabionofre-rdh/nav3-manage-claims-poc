import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import type { CommonProps } from "@/@types/common";
import PostLoginLayout from "./PostLoginLayout";
import PreLoginLayout from "./PreLoginLayout";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import appConfig from "@/configs/app.config";

const Layout = ({ children }: CommonProps) => {
  const layoutType = useSelector((state: AppState) => state.theme.layout.type);

  const isAuthenticated = appConfig.isPlaywright ? true : useIsAuthenticated();
  const { inProgress } = appConfig.isPlaywright
    ? { inProgress: InteractionStatus.None }
    : useMsal();

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      {inProgress && inProgress !== InteractionStatus.None ? null : isAuthenticated ? (
        <PostLoginLayout layoutType={layoutType}>{children}</PostLoginLayout>
      ) : (
        <PreLoginLayout>{children}</PreLoginLayout>
      )}
    </Suspense>
  );
};

export default Layout;

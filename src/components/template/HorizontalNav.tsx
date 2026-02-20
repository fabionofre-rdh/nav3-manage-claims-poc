import HorizontalMenuContent from "./HorizontalMenuContent";
import appConfig from "@/configs/app.config";
import navigationConfig from "@/configs/navigation.config";
import { AppState } from "@/redux/store";
import { useSelector } from "react-redux";

const HorizontalNav = ({
  translationSetup = appConfig.activeNavTranslation,
}: {
  translationSetup?: boolean;
}) => {
  const currentRouteKey = useSelector((state: AppState) => state.routeKey.currentRouteKey);

  return (
    <HorizontalMenuContent
      navigationTree={navigationConfig}
      routeKey={currentRouteKey}
      userAuthority={[]}
      translationSetup={translationSetup}
    />
  );
};

export default HorizontalNav;

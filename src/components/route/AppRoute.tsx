import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import type { LayoutType } from "@/@types/theme";
import type { ComponentType } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";
import { setCurrentRouteKey } from "@/redux/slices/routeKeySlice";
import { setLayout, setPreviousLayout } from "@/redux/slices/themeSlice";

export type AppRouteProps<T> = {
  component: ComponentType<T>;
  routeKey: string;
  layout?: LayoutType;
};

const AppRoute = <T extends Record<string, unknown>>({
  component: Component,
  routeKey,
  ...props
}: AppRouteProps<T>) => {
  const location = useLocation();

  const layout = useSelector((state: AppState) => state.theme.layout);

  const { type: layoutType, previousType: previousLayout } = layout;

  const dispatch = useDispatch<AppDispatch>();

  const handleLayoutChange = useCallback(() => {
    dispatch(setCurrentRouteKey(routeKey));

    if (props.layout && props.layout !== layoutType) {
      dispatch(setPreviousLayout(layoutType));
      dispatch(setLayout(props.layout));
    }

    if (!props.layout && previousLayout && layoutType !== previousLayout) {
      dispatch(setLayout(previousLayout));
      dispatch(setPreviousLayout(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.layout, routeKey]);

  useEffect(() => {
    handleLayoutChange();
  }, [location, handleLayoutChange]);

  return <Component {...(props as T)} />;
};

export default AppRoute;

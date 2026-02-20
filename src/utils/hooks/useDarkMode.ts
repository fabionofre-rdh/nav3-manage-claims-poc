import { useEffect } from "react";
import { THEME_ENUM } from "@/constants/theme.constant";
import type { Mode } from "@/@types/theme";
import { AppDispatch, AppState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "@/redux/slices/themeSlice";

function useDarkMode(): [isEnabled: boolean, onModeChange: (mode: Mode) => void] {
  const mode = useSelector((state: AppState) => state.theme.mode);
  const dispatch = useDispatch<AppDispatch>();

  const { MODE_DARK, MODE_LIGHT } = THEME_ENUM;

  const isEnabled = mode === MODE_DARK;

  const onModeChange = (mode: Mode) => {
    dispatch(setMode(mode));
  };

  useEffect(() => {
    if (window === undefined) {
      return;
    }
    const root = window.document.documentElement;
    root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK);
    root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  return [isEnabled, onModeChange];
}

export default useDarkMode;

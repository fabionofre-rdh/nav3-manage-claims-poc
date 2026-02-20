import { useEffect } from "react";
import type { Direction } from "@/@types/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux/store";
import { setDirection } from "@/redux/slices/themeSlice";

function useDirection(): [direction: Direction, setDirection: (dir: Direction) => void] {
  const direction = useSelector((state: AppState) => state.theme.direction);
  const dispatch = useDispatch<AppDispatch>();
  const setDirectionFn = (dir: Direction) => {
    dispatch(setDirection(dir));
  };

  useEffect(() => {
    if (window === undefined) {
      return;
    }
    const root = window.document.documentElement;
    root.setAttribute("dir", direction);
  }, [direction]);

  return [direction, setDirectionFn];
}

export default useDirection;

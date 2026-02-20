import { THEME_ENUM } from "@/constants/theme.constant";
import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { AppState } from "@/redux/store";
import { useSelector } from "react-redux";

interface DoubleSidedImageProps
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  darkModeSrc: string;
}

const { MODE_DARK } = THEME_ENUM;

const DoubleSidedImage = ({ src, darkModeSrc, alt = "", ...rest }: DoubleSidedImageProps) => {
  const mode = useSelector((state: AppState) => state.theme.mode);

  return <img src={mode === MODE_DARK ? darkModeSrc : src} alt={alt} {...rest} />;
};

export default DoubleSidedImage;

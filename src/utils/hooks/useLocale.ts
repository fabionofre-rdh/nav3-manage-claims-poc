import { useEffect } from "react";
import i18n from "i18next";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

const useLocale = () => {
  const { currentLang } = useSelector((state: AppState) => state.locale);

  useEffect(() => {
    if (i18n.language !== currentLang) {
      const formattedLang = currentLang.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
      i18n.changeLanguage(formattedLang);
    }
  }, [currentLang]);

  return {
    locale: currentLang,
  };
};

export default useLocale;

import { createSlice } from "@reduxjs/toolkit";
import appConfig from "@/configs/app.config";
import i18n from "i18next";
import { dateLocales } from "@/locales";
import dayjs from "dayjs";

const initialState = {
  currentLang: appConfig.locale,
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLang: (state, action) => {
      const formattedLang = action.payload.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
      i18n.changeLanguage(formattedLang);

      dateLocales[formattedLang]().then(() => {
        dayjs.locale(formattedLang);
      });

      state.currentLang = action.payload;
    },
  },
});

export const { setLang } = localeSlice.actions;
export default localeSlice.reducer;

import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import localeReducer from "./slices/localeSlice";
import routeKeyReducer from "./slices/routeKeySlice";
import themeReducer from "./slices/themeSlice";
import { persistStore } from "redux-persist";
import aiAgentReducer from "./slices/aiAgentSlice";
// Please sort the slice alphabetically for easier debugging
const initialReducer = combineReducers({
  auth: authReducer,
  locale: localeReducer,
  routeKey: routeKeyReducer,
  theme: themeReducer,
  aiAgent: aiAgentReducer,
});

export type AppState = ReturnType<typeof initialReducer>;

export function setupStore() {
  return configureStore({
    reducer: initialReducer,
  });
}

export const store = setupStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

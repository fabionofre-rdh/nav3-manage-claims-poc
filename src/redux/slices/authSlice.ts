/* eslint-disable @typescript-eslint/no-explicit-any */
import appConfig from "@/configs/app.config";
import { TOKEN_NAME_IN_STORAGE } from "@/constants/api.constant";
import { User } from "@/services/api/api.types";
import cookiesStorage from "@/utils/cookiesStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AppThunk } from "../store";
import { APIFetchUser } from "@/services/api/api";

export interface AuthState {
  isUserSignedIn: boolean;
  user?: User | null;
  isFetchingUser: boolean;
}

const initialState: AuthState = {
  isUserSignedIn: false,
  user: null,
  isFetchingUser: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsUserSignedIn: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isUserSignedIn = action.payload;
    },
    setUser: (state: AuthState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsFetchingUser: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isFetchingUser = action.payload;
    },
  },
});


const getPersistStorage = () => {
  if (appConfig.accessTokenPersistStrategy === "localStorage") {
    return localStorage;
  }

  if (appConfig.accessTokenPersistStrategy === "sessionStorage") {
    return sessionStorage;
  }

  return cookiesStorage;
};

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsFetchingUser(true));

    const data = await APIFetchUser();
    dispatch(setUser(data));
    console.log("[DEBUG data]", data);
    dispatch(setIsFetchingUser(false));
  } catch (e) {
    console.log("[ERROR e]", e);
    dispatch(setIsFetchingUser(false));
  }
};

export const useToken = () => {
  const storage = getPersistStorage();

  const setToken = (token: string) => {
    storage.setItem(TOKEN_NAME_IN_STORAGE, token);
  };

  return {
    setToken,
    token: storage.getItem(TOKEN_NAME_IN_STORAGE),
  };
};

export const { setIsUserSignedIn, setUser, setIsFetchingUser } = auth.actions;

const AuthPersistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
};

export default persistReducer(AuthPersistConfig, auth.reducer);

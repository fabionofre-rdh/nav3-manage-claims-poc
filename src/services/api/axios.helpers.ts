import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import appConfig from "@/configs/app.config";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "@/constants/api.constant";
import { sec } from "./security";
import { msalInstance } from "@/auth/msalInstance";

const unauthorizedCode = [401, 419, 440];

export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  let token: string | null = "";
  if (!appConfig.isPlaywright) {
    token = await sec.getAccessToken();
  }
  console.log("token======", token);

  if (!config.headers) {
    config.headers = config.headers || {};
    config.headers["Content-Type"] = "application/json";
  }

  if (token && (!config.headers.non_auth || config.headers.non_auth === "false")) {
    config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${token}`;
  }
  delete config.headers.non_auth;
  return config;
};

export const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export const responseInterceptor = (response: AxiosResponse) => response;

export const responseErrorInterceptor = (error: AxiosError) => {
  const { response } = error;
  if (response && unauthorizedCode.includes(response.status)) {
    msalInstance
      .logoutPopup({
        mainWindowRedirectUri: "/",
        postLogoutRedirectUri: "/",
      })
      .catch(() => {
        window.location.href = appConfig.unAuthenticatedEntryPath;
      });
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

export const applyInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
  instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
  return instance;
};

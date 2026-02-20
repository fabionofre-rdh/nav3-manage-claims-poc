import appConfig from "@/configs/app.config";
import axios from "axios";
import { applyInterceptors } from "./axios.helpers";

const api = axios.create({
  baseURL: appConfig.apiBase,
});

applyInterceptors(api);

export default api;

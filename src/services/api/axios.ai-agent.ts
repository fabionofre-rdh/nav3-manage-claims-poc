import appConfig from "@/configs/app.config";
import axios from "axios";
import { applyInterceptors } from "./axios.helpers";

const apiAiAgent = axios.create({
  baseURL: appConfig.aiAgentApiBase,
});

applyInterceptors(apiAiAgent);

export default apiAiAgent;

import { AGENT_AUTHOR } from "@/constants/api.constant";

export const isAuthorAnAgentOrSubAgent = (author: string) => {
  return AGENT_AUTHOR.includes(author);
};
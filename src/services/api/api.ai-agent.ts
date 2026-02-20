import apiAiAgent from "./axios.ai-agent";
import {
  APIAgentEvent,
  APIGetUserSessionsResponse,
  APISendMessageRequest,
  APISendMessageResponse,
} from "./api.types";

export const APIGetUserSessions = async (userId: string) => {
  const { data } = await apiAiAgent.get<APIGetUserSessionsResponse>(
    `discovery-agent/user/${userId}/sessions`
  );
  return data;
};

export const APIGetConversation = async (conversationId: string) => {
  const { data } = await apiAiAgent.get<APIAgentEvent[]>(
    `discovery-agent/session/${conversationId}/events`
  );
  return data;
};

export const APISendMessage = async (payload: APISendMessageRequest) => {
  const { data } = await apiAiAgent.post<APISendMessageResponse>(`discovery-agent/chat`, payload);
  return data;
};

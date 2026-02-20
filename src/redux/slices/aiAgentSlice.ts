import {
  APIAgentEvent,
  APIAgentSession,
  APIGetAllHgrRequest,
  APIHgr,
  APIHgrEntityStagesWithTask,
  APISendMessageRequest,
  PaginationMetadata,
  SortOrder,
} from "@/services/api/api.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  APIGetConversation,
  APIGetUserSessions,
  APISendMessage,
} from "@/services/api/api.ai-agent";

export interface AiAgentState {
  userSessions: APIAgentSession[] | null;
  isFetchingUserSessions?: boolean;
  selectedConversation: string | null;
  selectedConversationMessages: APIAgentEvent[] | null;
  isLoadingSelectedConversationMessages: boolean;
  isSendingNewMessage: boolean;
}

export const initialState: AiAgentState = {
  userSessions: null,
  isFetchingUserSessions: false,
  selectedConversation: null,
  selectedConversationMessages: [],
  isLoadingSelectedConversationMessages: false,
  isSendingNewMessage: false,
};
export const aiAgentSlice = createSlice({
  name: "aiAgent",
  initialState,
  reducers: {
    setIsFetchingUserSessions: (state: AiAgentState, action: PayloadAction<boolean>) => {
      state.isFetchingUserSessions = action.payload;
    },
    setUserSessions: (state: AiAgentState, action: PayloadAction<APIAgentSession[] | null>) => {
      state.userSessions = action.payload;
    },
    setSelectedConversation: (state: AiAgentState, action: PayloadAction<string | null>) => {
      state.selectedConversation = action.payload;
    },
    setSelectedConversationMessages: (
      state: AiAgentState,
      action: PayloadAction<APIAgentEvent[] | null>
    ) => {
      state.selectedConversationMessages = action.payload;
    },
    setIsLoadingSelectedConversationMessages: (
      state: AiAgentState,
      action: PayloadAction<boolean>
    ) => {
      state.isLoadingSelectedConversationMessages = action.payload;
    },
    setIsSendingNewMessage: (state: AiAgentState, action: PayloadAction<boolean>) => {
      state.isSendingNewMessage = action.payload;
    },
  },
});
export const getUserSessions =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsFetchingUserSessions(true));
      const data = await APIGetUserSessions(userId);
      console.log("[AI_CHAT data]", data);
      dispatch(setUserSessions(data || []));
      dispatch(setIsFetchingUserSessions(false));
    } catch (error) {
      dispatch(setIsFetchingUserSessions(false));
      console.log("[ERROR e]", error);
    }
  };

export const getSelectedConversationMessages =
  (conversationId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoadingSelectedConversationMessages(true));
      const data = await APIGetConversation(conversationId);
      console.log("[AI_CHAT data]", data);
      dispatch(setIsLoadingSelectedConversationMessages(false));
      dispatch(setSelectedConversationMessages(data || []));
    } catch (error) {
      console.log("[ERROR e]", error);
    }
  };

export const sendNewMessage =
  (payload: APISendMessageRequest): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsSendingNewMessage(true));
      const data = await APISendMessage(payload);
      console.log("[AI_CHAT data]", data);
      dispatch(setIsSendingNewMessage(false));
      dispatch(getSelectedConversationMessages(data.session_id));
      dispatch(setSelectedConversation(data.session_id));
      dispatch(getUserSessions(data?.user_id));
    } catch (error) {
      dispatch(setIsSendingNewMessage(false));
      console.log("[ERROR e]", error);
    }
  };

export const {
  setIsFetchingUserSessions,
  setUserSessions,
  setSelectedConversation,
  setSelectedConversationMessages,
  setIsLoadingSelectedConversationMessages,
  setIsSendingNewMessage,
} = aiAgentSlice.actions;
export default aiAgentSlice.reducer;

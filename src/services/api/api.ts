import api from "./axios";
import {
  APIGetUsersResponse,
} from "./api.types";

export const APIFetchUser = async () => {
  const { data } = await api.get<APIGetUsersResponse>(`user/me`);
  return data.data;
};

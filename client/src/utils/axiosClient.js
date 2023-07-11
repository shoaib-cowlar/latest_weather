import axios from "axios";
import { serverURL } from "@/config";

const api = axios.create({
  baseURL: serverURL.url,
});

export const getRequest = async (url) => {
  return await api.get(url);
};

export const postRequest = async (url, data) => {
  return await api.post(url, data);
};

export const getRequestWithToken = async (url, token) => {
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

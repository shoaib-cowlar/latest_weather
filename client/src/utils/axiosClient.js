import axios from "axios";
import { serverURL } from "@/config";
import { getAccessToken, getRefreshToken, setAccessToken } from "@/helpers";

const api = axios.create({
  baseURL: serverURL.url,
});

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        originalRequest._retry = true;

        try {
          const response = await postRequestRefreshToken();
          setAccessToken(response.accessToken);

          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          // Handle error refreshing the token if necessary
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export const getRequest = async (url) => {
  return await api.get(url);
};

export const postRequest = async (url, data) => {
  return await api.post(url, data);
};

export const postRequestRefreshToken = async (
  url = "/api/auth/refresh-token",
) => {
  const token = getRefreshToken();
  const response = await api.post(url, { refreshToken: token });
  setAccessToken(response.data.accessToken);
  return response.data;
};

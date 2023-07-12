import {
  getRefreshToken,
  removeRefreshToken,
  removeUserInfo,
  setAccessToken,
  setRefreshToken,
  setUserInfo,
} from "@/helpers";
import { postRequest } from "@/utils/axiosClient";

export const userSignup = async (reqBody) => {
  const response = await postRequest(`/api/auth/signup`, reqBody);
  return response;
};

export const userLogin = async (reqBody) => {
  const response = await postRequest(`/api/auth/login`, reqBody);
  if (response.data && response.data.accessToken) {
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    setUserInfo(response.data.user);
  }
  return response;
};

export const userLogout = async () => {
  const refreshToken = getRefreshToken();
  const response = await postRequest(`/api/auth/logout`, { refreshToken });
  removeRefreshToken();
  removeUserInfo();
  return response;
};

// export const userLogout = async () => {
//   const response = await get(`/auth/logout`, {}, true);
//   return response;
// };

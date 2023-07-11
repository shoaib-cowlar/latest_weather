import { postRequest } from "@/utils/axiosClient";

export const userSignup = async (reqBody) => {
    const response = await postRequest(`/api/auth/signup`, reqBody);
    return response;
  };

export const userLogin = async (reqBody) => {
  const response = await postRequest(`/api/auth/login`, reqBody);
  return response;
};

// export const userLogout = async () => {
//   const response = await get(`/auth/logout`, {}, true);
//   return response;
// };

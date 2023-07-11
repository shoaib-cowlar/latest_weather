import { getRequest } from "@/utils/axiosClient";

export const getWeather = async () => {
    const response = await getRequest(`/api/weather`);
    return response;
  };

// export const userLogout = async () => {
//   const response = await get(`/auth/logout`, {}, true);
//   return response;
// };

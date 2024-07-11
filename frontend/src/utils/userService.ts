// services/userService.ts

import { authType } from "@/@types/userType";
import { getCookieStringAuth } from "@/utils/getCookieStringAuth";

import axios from "axios";
import { handleAxiosError } from "./axiosErrorhandler";

export const getUserData = async (): Promise<authType> => {
  const cookieString = getCookieStringAuth();
  const apiUrl = "http://localhost:3000/api/v1/auth/user-all";

  try {
    if (typeof cookieString === "object") {
      return cookieString;
    }

    const res = await axios.get(apiUrl, {
      withCredentials: true,
      headers: { Cookie: cookieString as string },
    });

    return { isAuth: true, data: res.data.dataUser };
  } catch (error: unknown) {
    handleAxiosError(error, {
      handleErrorResponse: (response) => {
        const { errors } = response.data;
        if (errors) {
          return { isAuth: false, errors: errors.message, data: null };
        }
      },
    });
    throw error;
  }
};

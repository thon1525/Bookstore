import { viewBookType } from "@/@types/BookType";
import { authType } from "@/@types/userType";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import { getCookieStringAuth } from "@/utils/getCookieStringAuth";
import axios from "axios";

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
    console.log(res);
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
export default async function Home() {
  const { isAuth, errors, data } = await getUserData();
  console.log(data);

  return <div>home page card</div>;
}

// utils/axiosErrorHandler.ts

import axios from "axios";

export const handleAxiosError = (
  error: unknown,
  { handleErrorResponse }: { handleErrorResponse: (response: any) => any }
) => {
  if (axios.isAxiosError(error) && error.response) {
    handleErrorResponse(error.response);
  } else {
    console.error("An unknown error occurred:", error);
  }
};

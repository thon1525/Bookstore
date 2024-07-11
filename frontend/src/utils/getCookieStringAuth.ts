// utils/getCookieStringAuth.ts

import { authType } from "@/@types/userType";
import { cookies } from "next/headers";

export const getCookieStringAuth = (): string | authType => {
  const cookiesStore = cookies();
  console.log(cookiesStore);
  const _ga = cookiesStore.get("_ga")?.value;
  const persistent = cookiesStore.get("persistent")?.value;
  const session = cookiesStore.get("session")?.value;
  const sessionSig = cookiesStore.get("session.sig")?.value;

  if (!persistent && !session) {
    return { isAuth: false, data: null };
  } else if (persistent && !session) {
    return `persistent=${persistent}`;
  } else if (session && !persistent) {
    return `_ga=${_ga};session=${session};session.sig=${sessionSig}`;
  } else if (persistent && session) {
    return `persistent=${persistent};session=${session};session.sig=${sessionSig}`;
  }
  return { isAuth: false, data: null, errors: "No cookie found!" };
};

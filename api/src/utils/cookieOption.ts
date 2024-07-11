import { CookieOptions } from "express";

export const OptionCookie: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  httpOnly: true,
  path: "/",
};

export const OptionSession: CookieSessionInterfaces.CookieSessionOptions = {
  name: "session",
  keys: [
    `48a9c9a7bd58fff6a243d45fdf5dc31b`,
    `9309de3ec71d5c4920b855d0ceb3b477`,
  ],
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,

  path: "/",
  overwrite: true,
};

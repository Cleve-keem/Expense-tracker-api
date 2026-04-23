import { CookieOptions, Response } from "express";

export const setCookie = (res: Response, name: string, token: string) => {
  const options: CookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: name === "refreshToken" ? 7 * 60 * 24 * 1000 : 15 * 60 * 1000,
    path: name === "refreshToken" ? "/api/v1/auth/refresh" : "/",
    // ...(name === "refreshToken" && { path: "/api/v1/auth/refresh" }),
  };

  res.cookie(name, token, options);
};

enum CookieNames {
  ACCESS = "accessToken",
  REFRESH = "refreshToken",
}

export const setAuthCookies = (
  res: Response,
  access: string,
  refresh: string,
) => {
  // Set Access Token
  setCookie(res, CookieNames.ACCESS, access);
  // Set Refresh Token
  setCookie(res, CookieNames.REFRESH, refresh);
};

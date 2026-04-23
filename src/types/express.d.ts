import { Request } from "express";

export interface AuthRequest extends Request {
  cookies: {
    accessToken?: string;
    refreshToken?: string;
    [key: string]: any;
  };

  user?: {
    userId: number;
  };
}

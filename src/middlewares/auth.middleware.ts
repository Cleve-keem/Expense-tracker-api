import { Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";
import { verifyToken } from "../utils/token.js";
import { AuthRequest } from "../types/express.js";

const authentication = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return errorResponse(res, 401, "Unauthorized");
  }

  try {
    const decoded = verifyToken(token) as { userId: number };
    if (!decoded || !decoded.userId) {
      return errorResponse(res, 401, "Unauthorized: Invalid token payload");
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (error: any) {
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return errorResponse(res, 401, message);
  }
};

export default authentication;

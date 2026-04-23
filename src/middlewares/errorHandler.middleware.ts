import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(
    `❌ [error]: ${err.name || 500} - ${err.message || "Internal Server Error"}`,
  );
  console.error(err.stack);

  return errorResponse(res, err.statusCode, err.message);
};

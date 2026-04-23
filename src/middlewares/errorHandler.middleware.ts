import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`❌ [error]: ${err.name} - ${err.message}`);

  return errorResponse(res, err.statusCode, err.message);
};

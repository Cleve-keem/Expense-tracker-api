import { Response } from "express";

const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  payload: unknown,
  key: string = "data",
) => {
  res.status(statusCode).json({ success: true, message, [key]: payload });
};

const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any,
) => {
  return res.status(statusCode).json({ success: false, message, error });
};

const InternalServerErrorResponse = (res: Response) => {};

export { successResponse, errorResponse, InternalServerErrorResponse };

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthError } from "../exceptions/authErrors.js";

dotenv.config();

const { TokenExpiredError, JsonWebTokenError } = jwt;

const generateAccessToken = (userId: number) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "15m",
    });
  } catch (error: any) {
    throw new AuthError(401, error.message);
  }
};

const generateRefreshToken = (userId: number) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "7d",
    });
  } catch (error: any) {
    throw new AuthError(401, error.message);
  }
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  } catch (error: any) {
    console.log("⚠ [jwt] error verifying token", error.message);
    if (error instanceof TokenExpiredError) {
      throw new AuthError(401, error.message);
    }
    if (error instanceof JsonWebTokenError) {
      throw new AuthError(401, error.message);
    }
    throw new AuthError(401, error.message);
  }
};

export { generateAccessToken, generateRefreshToken, verifyToken };

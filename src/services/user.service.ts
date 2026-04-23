import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express.js";

class UserController {
  static async getUserProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log("User profile requested for user:", req.user?.userId);
      // Add logic to fetch user profile data here
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

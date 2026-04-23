import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express.js";

class SettingsController {
  static async getUserProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(req.user?.userId);
    } catch (error: any) {
      // next(error);
    }
  }
}

export default SettingsController;

import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express.js";
import SettingsService from "../services/settings.service.js";
import { successResponse } from "../utils/response.js";

class SettingsController {
  static async getUserProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await SettingsService.getUserProfile(
        req.user?.userId as number,
      );
      return successResponse(
        res,
        200,
        "User profile fetch successfully",
        result,
      );
    } catch (error: any) {
      next(error);
    }
  }

  static async updateUserProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await SettingsService.updateUserProfile(
        req.user?.userId as number,
        req.body,
      );
      return successResponse(res, 201, "Pofile updated successfully", result);
    } catch (error: any) {
      next(error);
    }
  }

  static async updateSecurity(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log("GET SECURITY DETAILS");
    } catch (error: any) {
      next(error);
    }
  }
}

export default SettingsController;

import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express.js";
import DashboardService from "../services/dashboard.service.js";
import { successResponse } from "../utils/response.js";

class DashboardController {
  static async getOverview(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      const summary = await DashboardService.getDashboardSummary(userId);
      return successResponse(res, 200, "dashboard summary", summary);
    } catch (error: any) {
      next(error);
    }
  }
}

export default DashboardController;

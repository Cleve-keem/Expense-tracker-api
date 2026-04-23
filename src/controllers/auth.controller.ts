import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/express.js";
import AuthService from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";
import { setAuthCookies } from "../utils/cookies.js";

class AuthController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.registerUser(req.body);
      // set auth cookies
      setAuthCookies(res, data.accessToken, data.refreshToken);
      return successResponse(
        res,
        201,
        "Account created successfully",
        data.user,
      );
    } catch (error: any) {
      next(error);
    }
  }

  static async authenticateUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await AuthService.loginUser(req.body);
      // set cookies
      setAuthCookies(res, data.accessToken, data.refreshToken);
      return successResponse(res, 200, "Login successfully!", data.user);
    } catch (error: any) {
      next(error);
    }
  }

  static async refresh(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken as string;
      const result = await AuthService.refreshSession(refreshToken);
      // set cookies
      setAuthCookies(res, result.accessToken, result.refreshToken);
      return successResponse(res, 200, "Token refreshed successfully!", {});
    } catch (error: any) {
      next(error);
    }
  }

  static async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.requestPasswordReset(req.body.email);
      return successResponse(res, 200, "Email sent successfully!", {});
    } catch (error: any) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;
      await AuthService.resetPassword(token, newPassword);
      return successResponse(res, 200, "Password reset successfully!", {});
    } catch (error: any) {
      next(error);
    }
  }
}

export default AuthController;

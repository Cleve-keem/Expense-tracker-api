import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express.js";
import TransactionService from "../services/transaction.service.js";
import { successResponse } from "../utils/response.js";

class TransactionController {
  static async addRecord(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await TransactionService.insertTransactionRecord({
        ...req.body,
        userId,
      });
      return successResponse(res, 201, "Record added successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllTransactionHistory(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      const response = await TransactionService.fetchAllTransactionHistory(
        userId,
        req.query,
      );
      return successResponse(
        res,
        200,
        "Transaction history fetched successfully",
        response,
        "response",
      );
    } catch (error) {
      next(error);
    }
  }

  static async getSingleTransactionHistory(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      const transactionId = req.params.transactionId;

      const response = await TransactionService.fetchSingleTransactionDetails(
        userId,
        Number(transactionId),
      );
      return successResponse(
        res,
        200,
        "Transaction history fetched successfully",
        response,
        "response",
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateTransactionRecord(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      const transactionId = req.params.transactionId;
      const updateData = req.body;

      const result = await TransactionService.updateTransactionRecord(
        userId,
        Number(transactionId),
        updateData,
      );
      return successResponse(
        res,
        200,
        "Transaction updated successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransactionRecord(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      const transactionId = req.params.transactionId;
      const result = await TransactionService.deleteTransactionRecord(
        userId,
        Number(transactionId),
      );
      return successResponse(
        res,
        204,
        "Transaction deleted successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;

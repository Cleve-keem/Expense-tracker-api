import { sequelize } from "../configs/db.config.js";
import {
  IllegalTransactionAmountError,
  TransactionRecordNotFoundError,
} from "../exceptions/transaction.js";
import CategoryRepository from "../repositories/category.repository.js";
import TransactionRepository from "../repositories/transaction.repository.js";
import { TransactionEnum } from "../types/transaction.type.js";

export type RecodeType = {
  userId: number;
  amount: number;
  name: string;
  icon?: string | null;
  description: string;
  type: TransactionEnum;
};

class TransactionService {
  static async insertTransactionRecord(record: RecodeType) {
    if (record.amount <= 0) {
      throw new IllegalTransactionAmountError(
        400,
        "Amount must be a positive number",
      );
    }

    return await sequelize.transaction(async (t) => {
      const [category] = await CategoryRepository.findOrCreate(
        {
          name: record.name,
          type: record.type,
          icon: record.icon,
          user_id: record.userId,
        },
        t,
      );
      // create a transaction
      const result = await TransactionRepository.create(
        {
          amount: record.amount,
          transaction_type: record.type,
          description: record.description,
          user_id: record.userId,
          category_id: category.id,
        },
        t,
      );
      return result;
    });
  }

  static async fetchAllTransactionHistory(userId: number, options: any) {
    const { page = 1, limit = 10 } = options;

    const result = await TransactionRepository.getTransactions(userId, options);

    const totalItems = result.count;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      transactions: result.rows,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    };
  }

  static async fetchSingleTransactionDetails(
    userId: number,
    transactionId: number,
  ) {
    return await TransactionRepository.getTransactionById(
      userId,
      transactionId,
    );
  }

  static async updateTransactionRecord(
    user_id: number,
    id: number,
    updatedRecord: any,
  ) {
    return await sequelize.transaction(async (t) => {
      const existingRecord = await TransactionRepository.getTransactionById(
        user_id,
        id,
      );
      if (!existingRecord)
        throw new TransactionRecordNotFoundError(
          404,
          "Transaction record not found!",
        );

      if (updatedRecord.amount && updatedRecord.amount <= 0) {
        throw new IllegalTransactionAmountError(
          400,
          "Amount must be a positive number",
        );
      }
      if (
        updatedRecord.dataValues.name ||
        updatedRecord.dataValues.type ||
        updatedRecord.dataValues.icon
      ) {
        const [category] = await CategoryRepository.findOrCreate(
          {
            name: updatedRecord.name || existingRecord.dataValues.category.name,
            type:
              updatedRecord.type || existingRecord.dataValues.transaction_type,
            icon: updatedRecord.icon || existingRecord.dataValues.category.icon,
            user_id: user_id,
          },
          t,
        );
        updatedRecord.category_id = category.id;
      }

      return await existingRecord.update(updatedRecord, { transaction: t });
    });
  }

  static async deleteTransactionRecord(user_id: number, id: number) {
    const deletedRows = await TransactionRepository.delete(user_id, id);

    if (deletedRows === 0)
      throw new TransactionRecordNotFoundError(
        404,
        "Transaction record not found!",
      );

    return { success: true };
  }
}

export default TransactionService;

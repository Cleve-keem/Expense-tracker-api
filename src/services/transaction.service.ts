import { sequelize } from "../configs/db.config.js";
import {
  IllegalTransactionAmountError,
  TranasactionRecordNotFoundError,
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
    const existingRecord = await TransactionRepository.getTransactionById(
      user_id,
      id,
    );
    if (!existingRecord)
      throw new TranasactionRecordNotFoundError(
        401,
        "Transaction record not found!",
      );

    return await existingRecord.update(updatedRecord);
  }

  static async deleteTransactionRecord(user_id: number, id: number) {
    const existingRecord = await TransactionRepository.getTransactionById(
      user_id,
      id,
    );

    if (!existingRecord)
      throw new TranasactionRecordNotFoundError(
        401,
        "Transaction record not found!",
      );

    await existingRecord.destroy();
  }
}

export default TransactionService;

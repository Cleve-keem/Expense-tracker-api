import { col, fn, Op } from "sequelize";
import {
  CategoryModel,
  TransactionModel,
} from "../models/association.model.js";

class TransactionRepository {
  static create(data: any, transactionHost: any) {
    return TransactionModel.create(data, {
      transaction: transactionHost,
    });
  }

  static async getUserExpenses(
    user_id: number,
  ): Promise<{ totalExpenses: number }[]> {
    return (await TransactionModel.findAll({
      where: { user_id, transaction_type: "Expense" },
      attributes: [
        [fn("COALESCE", fn("SUM", col("amount")), 0), "totalExpenses"],
      ],
      raw: true,
    })) as unknown as { totalExpenses: number }[];
  }

  static async getUserIncomes(
    user_id: number,
  ): Promise<{ totalIncomes: number }[]> {
    return (await TransactionModel.findAll({
      where: { user_id, transaction_type: "Income" },
      attributes: [
        [fn("COALESCE", fn("SUM", col("amount")), 0), "totalIncomes"],
      ],
      raw: true,
    })) as unknown as { totalIncomes: number }[];
  }

  static async getTransactions(user_id: number, options: any) {
    const {
      page = 1,
      limit = 10,
      transaction_type,
      startDate,
      endDate,
    } = options;
    const offset = (page - 1) * limit;

    const whereClause: any = { user_id };
    if (transaction_type) whereClause.transaction_type = transaction_type;
    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    return await TransactionModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: ["name", "type", "icon"],
        },
      ],
      limit,
      offset,
      order: [["date", "DESC"]],
    });
  }

  static async getTransactionById(user_id: number, id: number) {
    return await TransactionModel.findOne({
      where: { user_id, id },
      include: [
        {
          model: CategoryModel,
          as: "category",
          attributes: ["name", "type", "icon"],
        },
      ],
    });
  }

  static async delete(user_id: number, id: number) {
    return await TransactionModel.destroy({ where: { id, user_id } });
  }
}

export default TransactionRepository;

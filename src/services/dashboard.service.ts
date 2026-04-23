import { UserNotFoundError } from "../exceptions/userErrors.js";
import TransactionRepository from "../repositories/transaction.repository.js";
import UserRepository from "../repositories/user.repository.js";

class DashboardService {
  static async getDashboardSummary(userId: number) {
    let user = await UserRepository.findUserById(userId);
    if (!user) throw new UserNotFoundError("User not found!");

    const [expenses, incomes, recentTransactions] = await Promise.all([
      TransactionRepository.getUserExpenses(userId),
      TransactionRepository.getUserIncomes(userId),
      TransactionRepository.getTransactions(userId, { limit: 5 }),
    ]);

    const current_balance = incomes[0].totalIncomes - expenses[0].totalExpenses;

    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        currency: user.currency,
      },
      summary: {
        current_balance: Number(current_balance).toFixed(2),
        totalExpenses: Number(expenses[0].totalExpenses).toFixed(2),
        totalIncomes: Number(incomes[0].totalIncomes).toFixed(2),
      },
      recentTransactions: recentTransactions.rows,
    };
  }
}

export default DashboardService;

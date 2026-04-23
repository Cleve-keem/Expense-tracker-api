import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import DashboardService from "../../src/services/dashboard.service";
import TransactionRepository from "../../src/repositories/transaction.repository";

vi.mock("../../src/repositories/user.repository.ts");

describe("Dashboard Service - Dashboard Summary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null if user not found", async () => {
    const spy = vi
      .spyOn(UserRepository, "findUserById")
      .mockResolvedValue(null);

    await expect(DashboardService.getDashboardSummary(1)).rejects.toThrow(
      "User not found!",
    );
    expect(spy).toHaveBeenCalledWith(1);
  });

  it("should return dashboard summary for a valid user", async () => {
    const mockUser = {
      id: 1,
      fullname: "John Doe",
      email: "john.doe@example.com",
      currency: "USD",
    };

    const mockExpenses = [{ totalExpenses: "100.00" }];
    const mockIncomes = [{ totalIncomes: "500.00" }];
    const mockTransactions = { rows: [] };

    const spy = vi
      .spyOn(UserRepository, "findUserById")
      .mockResolvedValue(mockUser as any);

    vi.spyOn(TransactionRepository, "getUserExpenses").mockResolvedValue(
      mockExpenses as any,
    );
    vi.spyOn(TransactionRepository, "getUserIncomes").mockResolvedValue(
      mockIncomes as any,
    );
    vi.spyOn(TransactionRepository, "getTransactions").mockResolvedValue(
      mockTransactions as any,
    );

    const result = await DashboardService.getDashboardSummary(mockUser.id);
    expect(result).toMatchObject({
      user: {
        currency: mockUser.currency,
      },
      summary: {
        current_balance: expect.any(String),
        totalExpenses: expect.any(String),
        totalIncomes: expect.any(String),
      },
      recentTransactions: [],
    });
    expect(spy).toHaveBeenCalledWith(mockUser.id);
  });
});

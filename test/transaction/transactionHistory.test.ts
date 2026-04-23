import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionService from "../../src/services/transaction.service";
import TransactionRepository from "../../src/repositories/transaction.repository";

describe("Transaction Service - fetchAllTransactionHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return transactions with correct pagination metadata", async () => {
    const mockTransactions = [
      {
        id: 1,
        amount: 500,
        description: "Water",
        category: { name: "Utilities" },
      },
      {
        id: 2,
        amount: 1500,
        description: "Internet",
        category: { name: "Bills" },
      },
    ];

    const mockRepoResponse = {
      count: 25,
      rows: mockTransactions,
    };

    const getTransactionsSpy = vi
      .spyOn(TransactionRepository, "getTransactions")
      .mockResolvedValue(mockRepoResponse as any);

    const userId = 1;
    const options = { page: 1, limit: 10 };
    const result = await TransactionService.fetchAllTransactionHistory(
      userId,
      options,
    );

    expect(result.transactions).toHaveLength(2);
    expect(result.transactions[0].id).toBe(1);

    expect(result.meta).toEqual({
      totalItems: 25,
      totalPages: 3,
      currentPage: 1,
      pageSize: 10,
    });

    expect(getTransactionsSpy).toHaveBeenCalledWith(userId, options);
  });

  it("should handle default pagination values if options are missing", async () => {
    const mockRepoResponse = { count: 0, rows: [] };
    vi.spyOn(TransactionRepository, "getTransactions").mockResolvedValue(
      mockRepoResponse as any,
    );

    const result = await TransactionService.fetchAllTransactionHistory(1, {});

    expect(result.meta.currentPage).toBe(1);
    expect(result.meta.pageSize).toBe(10);
    expect(result.meta.totalPages).toBe(0);
  });
});

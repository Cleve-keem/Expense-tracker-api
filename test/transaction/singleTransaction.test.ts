import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionService from "../../src/services/transaction.service";
import TransactionRepository from "../../src/repositories/transaction.repository";

describe("Transaction Service - fetchAllTransactionHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a single transaction with details", async () => {
    const mockedTransaction = {
      id: 1,
      amount: 500,
      description: "Water",
      category: { name: "Utilities" },
    };

    const transactionSpy = vi
      .spyOn(TransactionRepository, "getTransactionById")
      .mockResolvedValue(mockedTransaction as any);

    const userId = 1;
    const transactionId = 2;

    const result = await TransactionService.fetchSingleTransactionDetails(
      userId,
      transactionId,
    );

    expect(result).toMatchObject({
      id: 1,
      category: { name: "Utilities" },
      amount: 500,
    });
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionService from "../../src/services/transaction.service";
import TransactionRepository from "../../src/repositories/transaction.repository";

describe("updateTransactionRecord", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should successfully update and return the record", async () => {
    const userId = 1;
    const transactionId = 101;
    const updateData = { amount: 75000 };

    const mockInstance = {
      id: transactionId,
      amount: 50000,
      userId: userId,
      update: vi.fn().mockResolvedValue({ id: transactionId, amount: 75000 }),
    };

    vi.spyOn(TransactionRepository, "getTransactionById").mockResolvedValue(
      mockInstance as any,
    );

    const result = await TransactionService.updateTransactionRecord(
      userId,
      transactionId,
      updateData,
    );

    expect(TransactionRepository.getTransactionById).toHaveBeenCalledWith(
      userId,
      transactionId,
    );
    expect(mockInstance.update).toHaveBeenCalledWith(updateData);
    expect(result.amount).toBe(75000);
  });

  it("should throw an error if the record is not found", async () => {
    vi.spyOn(TransactionRepository, "getTransactionById").mockResolvedValue(
      null,
    );

    await expect(
      TransactionService.updateTransactionRecord(1, 999, {}),
    ).rejects.toThrow("Transaction record not found!");
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionService from "../../src/services/transaction.service";
import TransactionRepository from "../../src/repositories/transaction.repository";

describe("Transaction Service - deleteTransactionRecord", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should throw an error if the record is not found", async () => {
    vi.spyOn(TransactionRepository, "getTransactionById").mockResolvedValue(
      null,
    );

    await expect(
      TransactionService.deleteTransactionRecord(1, 1000),
    ).rejects.toThrow("Transaction record not found!");
  });

  it("should successfully delete the record", async () => {
    const userId = 5;
    const transactionId = 209;

    const mockInstance = {
      id: transactionId,
      amount: 5000,
      icon: "💛",
      destroy: vi.fn().mockResolvedValue(null),
    };

    vi.spyOn(TransactionRepository, "getTransactionById").mockResolvedValue(
      mockInstance as any,
    );

    const result = await TransactionService.deleteTransactionRecord(
      userId,
      transactionId,
    );

    expect(TransactionRepository.getTransactionById).toHaveBeenCalledWith(
      userId,
      transactionId,
    );
    expect(mockInstance.destroy).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import TransactionService from "../../src/services/transaction.service";
import TransactionRepository from "../../src/repositories/transaction.repository";
import CategoryRepository from "../../src/repositories/category.repository";
import { sequelize } from "../../src/configs/db.config";

describe("Transaction Service - insertTransactionRecord", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.spyOn(sequelize, "transaction").mockImplementation(
    async (callback: any) => {
      return callback("mock-transaction-obj");
    },
  );

  const validRecord: any = {
    userId: 1,
    amount: 1000,
    name: "Groceries",
    icon: "🛒",
    description: "Weekly shopping",
    type: "expense",
  };

  it("should throw a 400 error if amount is zero or negative", async () => {
    const badRecord = { ...validRecord, amount: 0 };

    await expect(
      TransactionService.insertTransactionRecord(badRecord),
    ).rejects.toThrow("Amount must be a positive number");
  });

  it("should successfully insert a record and return the result", async () => {
    const mockCategory = { id: 99, name: "Groceries" };
    const mockTransaction = { id: 500, ...validRecord, category_id: 99 };

    const findOrCreateSpy = vi
      .spyOn(CategoryRepository, "findOrCreate")
      .mockResolvedValue([mockCategory, true] as any);

    const createSpy = vi
      .spyOn(TransactionRepository, "create")
      .mockResolvedValue(mockTransaction as any);

    const result =
      await TransactionService.insertTransactionRecord(validRecord);

    expect(result).toEqual(mockTransaction);

    expect(findOrCreateSpy).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Groceries", user_id: 1 }),
      "mock-transaction-obj",
    );

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 1000,
        category_id: 99,
        transaction_type: "expense",
      }),
      "mock-transaction-obj",
    );
  });
});

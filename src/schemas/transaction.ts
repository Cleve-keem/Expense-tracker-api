import z from "zod";

const transactionTypeEnum = z.enum(["income", "expense"]);

export const TransactionSchema = z.object({
  name: z.string().min(1, "Name must be at least 3 character long"),
  amount: z.preprocess((val) => Number(val), z.number().positive()),
  type: transactionTypeEnum.default("expense"),
  icon: z.string().optional(),
  description: z.string().min(1, "Record must be have description"),
});

export type TransactionInputType = z.infer<typeof TransactionSchema>;

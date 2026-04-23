export enum TransactionEnum {
  income = "income",
  expense = "expense",
}

export interface TransactionSummary {
  totalExpenses?: number;
  totalIncomes?: number;
}

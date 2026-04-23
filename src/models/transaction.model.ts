import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db.config.js";

enum TransactionType {
  Income = "income",
  Expense = "expense",
}

class TransactionModel extends Model {
  declare id: number;
  declare amount: number;
  declare user_id: number;
  declare category_id: number;
  declare type: TransactionType;
  declare description: string | null;
  declare date: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

TransactionModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    amount: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      get() {
        const value = this.getDataValue("amount");
        return value === null ? null : parseFloat(value);
      },
    },
    transaction_type: {
      type: DataTypes.ENUM(...Object.values(TransactionType)),
      allowNull: false,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "transaction",
    indexes: [{ fields: ["user_id"] }, { fields: ["date"] }],
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id", "category_id"],
      },
    },
  },
);

export default TransactionModel;

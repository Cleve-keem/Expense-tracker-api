import { DataTypes, Model } from "sequelize";
import { TransactionEnum } from "../types/transaction.type.js";
import { sequelize } from "../configs/db.config.js";

class CategoryModel extends Model {
  declare id: number;
  declare name: string;
  declare type: TransactionEnum;
  declare icon?: string;
  declare user_id: number;
}

CategoryModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM("Income", "Expense"),
      allowNull: false,
      defaultValue: "Expense",
    },
    icon: { type: DataTypes.STRING, allowNull: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "category",
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt", "user_id"],
      },
    },
  },
);

export default CategoryModel;

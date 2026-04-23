import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db.config.js";

class RefreshTokenModel extends Model {
  declare id: number;
  declare token: string;
  declare userId: number;
  declare token_expires: Date;

  declare readonly createdAt: Date;
}

RefreshTokenModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    token_expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "refreshToken", updatedAt: false },
);

export default RefreshTokenModel;

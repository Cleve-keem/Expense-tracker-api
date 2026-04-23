import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/db.config.js";

class UserModel extends Model {
  declare id: number;
  declare fullname: string;
  declare email: string;
  declare password: string;
  declare currency: "NGN" | "USD" | "EUR";
  declare isVerified: boolean;
  declare profilePicture?: string | null;
  declare verification_token?: string | null;
  declare verification_token_expires?: Date | null;
  declare password_reset_token?: string | null;
  declare password_reset_token_expires?: Date | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    currency: {
      type: DataTypes.ENUM("NGN", "USD", "EUR"),
      allowNull: false,
      defaultValue: "NGN",
    },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verification_token: { type: DataTypes.STRING, allowNull: true },
    verification_token_expires: { type: DataTypes.DATE, allowNull: true },
    password_reset_token: { type: DataTypes.STRING, allowNull: true },
    password_reset_token_expires: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, modelName: "user", indexes: [{ fields: ["email"] }] },
);

export default UserModel;

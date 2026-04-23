import CategoryModel from "./category.model.js";
import TransactionModel from "./transaction.model.js";
import UserModel from "./user.model.js";

UserModel.hasMany(TransactionModel, {
  foreignKey: "user_id",
});
TransactionModel.belongsTo(UserModel, { foreignKey: "user_id" });

CategoryModel.hasMany(TransactionModel, { foreignKey: "category_id" });
TransactionModel.belongsTo(CategoryModel, { foreignKey: "category_id" });

UserModel.hasMany(CategoryModel, { foreignKey: "user_id" });
CategoryModel.belongsTo(UserModel, { foreignKey: "user_id" });

export { UserModel, CategoryModel, TransactionModel };

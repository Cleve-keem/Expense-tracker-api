import UserModel from "../models/user.model.js";
import { RegisterInput } from "../schemas/auth.js";

class UserRepository {
  static async createAndSaveUser(user: RegisterInput) {
    return await UserModel.create(user);
  }

  static async findUserByEmail(email: string) {
    return await UserModel.findOne({ where: { email } });
  }

  static async findUserById(id: number) {
    return await UserModel.findOne({ where: { id } });
  }

  static async findUserByResetToken(token: string) {
    return await UserModel.findOne({
      where: {
        password_reset_token: token,
        password_reset_expires: {
          [require("sequelize").Op.gt]: new Date(),
        },
      },
    });
  }
}

export default UserRepository;

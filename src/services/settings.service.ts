import bcrypt from "bcryptjs";
import {
  InvalidUserPassword,
  UserNotFoundError,
} from "../exceptions/userErrors.js";
import UserRepository from "../repositories/user.repository.js";

class SettingsService {
  static async getUserProfile(user_id: number) {
    const existingUser = await UserRepository.findUserById(user_id);
    if (!existingUser) throw new UserNotFoundError("User not found!");

    return existingUser;
  }

  static async updateUserProfile(user_id: number, updateData: any) {
    const existingUser = await UserRepository.findUserById(user_id);
    if (!existingUser) throw new UserNotFoundError("User not found!");

    await existingUser.update(updateData);
    return existingUser;
  }

  static async updateUserPassword(user_id: number, updatePasswordData: any) {
    const user = await UserRepository.findUserById(user_id);
    if (!user) throw new UserNotFoundError("User not found!");
    // Verify user db password with provided old password
    const isMatch = await bcrypt.compare(
      user.password,
      updatePasswordData.oldPassword,
    );

    if (!isMatch) throw new InvalidUserPassword(401, "Invalid Old Password!");
  }
}

export default SettingsService;

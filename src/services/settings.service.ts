import { UserNotFoundError } from "../exceptions/userErrors.js";
import UserRepository from "../repositories/user.repository.js";

class SettingsService {
  static async getUserProfile(user_id: number) {
    const existingUser = await UserRepository.findUserById(user_id);
    if (!existingUser) throw new UserNotFoundError("User not found!");

    return existingUser.dataValues;
  }
}

export default SettingsService;

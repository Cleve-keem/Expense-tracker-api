import RefreshTokenModel from "../models/refreshToken.model.js";
import { RefreshTokenType } from "../types/token.js";

export type RefreshToken = {
  userId: number;
  token: string;
  token_expires: Date;
};

class RefreshTokenRepository {
  static async findTokenByUserId(user_id: number) {
    return RefreshTokenModel.findOne({ where: { user_id } });
  }

  static async findToken(token: string) {
    return RefreshTokenModel.findOne({ where: { token } });
  }

  static async saveRefreshToken(tokenDetails: RefreshTokenType) {
    return RefreshTokenModel.create(tokenDetails);
  }
}

export default RefreshTokenRepository;

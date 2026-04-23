import bcrypt from "bcryptjs";
import {
  InvalidUserPassword,
  UserAlreadyExistError,
  UserNotFoundError,
} from "../exceptions/userErrors.js";
import UserRepository from "../repositories/user.repository.js";
import { LoginInput, RegisterInput } from "../schemas/auth.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import RefreshTokenRepository from "../repositories/refreshToken.repository.js";
import UnauthorizedError from "../exceptions/index.js";

class AuthService {
  static async registerUser(data: RegisterInput) {
    data.email = data.email.toLowerCase(); // convert email to lower case
    // check user existence
    const isExistUser = await UserRepository.findUserByEmail(data.email);
    if (isExistUser)
      throw new UserAlreadyExistError(401, "User email already exist");
    // hash password
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    // create save user
    const user = await UserRepository.createAndSaveUser(data);
    // generate tokens
    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken(user.id),
      generateRefreshToken(user.id),
    ]);

    const refresh_token_expires_at = new Date(Date.now() + 7 * 60 * 24 * 10000);

    const savedToken = await RefreshTokenRepository.findTokenByUserId(user.id);
    if (savedToken) {
      await savedToken.update({
        token: refreshToken,
        token_expires: refresh_token_expires_at,
      });
    } else {
      await RefreshTokenRepository.saveRefreshToken({
        userId: user.id,
        token: refreshToken,
        token_expires: refresh_token_expires_at,
      });
    }

    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        currency: user.currency,
      },
      accessToken,
      refreshToken,
    };
  }

  static async loginUser(data: LoginInput) {
    data.email = data.email.toLowerCase();

    const user = await UserRepository.findUserByEmail(data.email);
    if (!user) throw new UserNotFoundError("Invalid credentials!");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new InvalidUserPassword(401, "Invalid credentials");

    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken(user.id),
      generateRefreshToken(user.id),
    ]);

    const refresh_token_expires_at = new Date(Date.now() + 7 * 60 * 24 * 10000);

    const savedToken = await RefreshTokenRepository.findTokenByUserId(user.id);
    if (savedToken) {
      await savedToken.update({
        token: refreshToken,
        token_expires: refresh_token_expires_at,
      });
    } else {
      await RefreshTokenRepository.saveRefreshToken({
        userId: user.id,
        token: refreshToken,
        token_expires: refresh_token_expires_at,
      });
    }

    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        currency: user.currency,
      },
      accessToken,
      refreshToken,
    };
  }

  static async refreshSession(refreshToken: string) {
    const savedToken = await RefreshTokenRepository.findToken(refreshToken);

    if (!savedToken || new Date() > savedToken.token_expires)
      throw new UnauthorizedError(401, "Session expired, please login again");
    // generate new tokens
    const [newAccessToken, newRefreshToken] = await Promise.all([
      generateAccessToken(savedToken.dataValues.userId),
      generateRefreshToken(savedToken.dataValues.userId),
    ]);
    // update old token
    await savedToken.update({
      token: newRefreshToken,
      token_expires: new Date(Date.now() + 7 * 60 * 24 * 10000),
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  static async requestPasswordReset(email: string) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (!existingUser) return;

    // if (!existingUser.isVerified) {
    //   throw new UnauthorizedError(401, "Email not verified!");
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedToken = await bcrypt.hash(
      existingUser.email + Date.now(),
      salt,
    );
    // save token and expiry to user record
    await existingUser.update({
      password_reset_token: hashedToken,
      password_reset_expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    // send email with reset link
    // const resetLink = `https://your-app.com/reset-password?token=${hashedToken}`;
    // await EmailService.sendPasswordResetEmail(existingUser.email, resetLink);

    return { resetToken: hashedToken };
  }

  static async resetPassword(token: string, newPassword: string) {
    const user = await UserRepository.findUserByResetToken(token);
    if (!user) throw new UnauthorizedError(401, "Invalid or expired token!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await user.update({
      password: hashedPassword,
      password_reset_token: null,
      password_reset_expires: null,
    });
    return true;
  }
}

export default AuthService;

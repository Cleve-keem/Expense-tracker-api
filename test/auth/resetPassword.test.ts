import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import AuthService from "../../src/services/auth.service";
import bcrypt from "bcryptjs";

describe("Auth Service - Reset password", () => {
  beforeEach(() => vi.clearAllMocks());

  const mockedUser = {
    id: 201,
    fullname: "Sunday Tolu",
    email: "example@gmail.com",
    password: "hashedToken",
    currency: "NGN",
  };

  it("should throw an error if user not found", async () => {
    vi.spyOn(UserRepository, "findUserByResetToken").mockResolvedValue(null);
    await expect(AuthService.resetPassword).rejects.toThrow(
      "Invalid or expired token!",
    );
  });

  it("should reset password if token is valid", async () => {
    const userInstance = {
      ...mockedUser,
      update: vi.fn().mockResolvedValue(true),
    };
    // find user by token
    vi.spyOn(UserRepository, "findUserByResetToken").mockResolvedValue(
      userInstance as any,
    );
    // hash nw password
    vi.spyOn(bcrypt, "genSalt").mockResolvedValue("salt" as any);
    vi.spyOn(bcrypt, "hash").mockResolvedValue("newHashedPassword" as any);

    // update the old password
    const result = await AuthService.resetPassword(
      "reset-password-token",
      "NewPassword",
    );

    expect(UserRepository.findUserByResetToken).toHaveBeenCalledWith(
      "reset-password-token",
    );
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(expect.any(String), "salt");
    expect(userInstance.update).toHaveBeenCalledWith({
      password: "newHashedPassword",
      password_reset_token: null,
      password_reset_expires: null,
    });

    // expect(result).toBeTruthy();
  });
});

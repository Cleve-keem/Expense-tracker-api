import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import AuthService from "../../src/services/auth.service";
import bcrypt from "bcryptjs";

describe("Auth Service - Forgot password", () => {
  beforeEach(() => vi.clearAllMocks());

  const mockedUser = {
    id: 201,
    fullname: "Sunday Tolu",
    email: "example@gmail.com",
    currency: "NGN",
  };
  

  it("should throw an error if user not found", async () => {
    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(null);

    expect(AuthService.requestPasswordReset).toBeDefined();
  });

  it("should generate tokens if user exists", async () => {
    const userInstance = {
      ...mockedUser,
      password_reset_token: null,
      password_reset_expires: null,
      update: vi.fn().mockResolvedValue(true),
    };

    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(
      userInstance as any,
    );

    vi.spyOn(bcrypt, "genSalt").mockResolvedValue("salt" as any);
    vi.spyOn(bcrypt, "hash").mockResolvedValue("mockedHashedPassword" as any);

    const result = await AuthService.requestPasswordReset("example@gmail.com");

    expect(UserRepository.findUserByEmail).toHaveBeenCalledWith(
      "example@gmail.com",
    );
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(
      expect.stringContaining("example@gmail.com"),
      "salt",
    );

    expect(userInstance.update).toHaveBeenCalledWith({
      password_reset_token: "mockedHashedPassword",
      password_reset_expires: expect.any(Date),
    });

    expect(result).toEqual({ resetToken: "mockedHashedPassword" });
  });

  // it("should throw an error if user email is not verified", async () => {
  //   const user = { ...mockedUser, is_email_verified: false };
  //   vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(user as any);

  //   await expect(AuthService.requestPasswordReset).rejects.toThrow(
  //     "Email not verified!",
  //   );
  // });
});

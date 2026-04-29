import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import SettingsService from "../../src/services/settings.service";
import bcrypt from "bcryptjs";

describe("PasswordReset", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should throw error if user don't exist", async () => {
    const userId = 501;
    const mockedPasswordPayload = {
      oldPassword: "Ayomiku@22",
      newPassword: "Hackhim@22",
    };

    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(null);

    await expect(
      SettingsService.updateUserPassword(userId, mockedPasswordPayload),
    ).rejects.toThrow("User not found!");
  });

  it("should throw error if user old password don't match", async () => {
    const mockedUserInstance = {
      id: 23,
      fullname: "Hakeem Bello",
      password: "hashedPassword",
    };

    const mockedPasswordUpdatePayload = {
      oldPassword: "Ayomiku@22",
      newPassword: "Hackhim@22",
    };

    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(
      mockedUserInstance as any,
    );

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as any);

    await expect(
      SettingsService.updateUserPassword(23, mockedPasswordUpdatePayload),
    ).rejects.toThrow("Invalid Old Password!");

    expect(bcrypt.compare).toHaveBeenCalledWith(
      mockedUserInstance.password,
      mockedPasswordUpdatePayload.oldPassword,
    );
  });
});

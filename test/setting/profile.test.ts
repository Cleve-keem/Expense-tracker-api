import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import SettingsService from "../../src/services/settings.service";

describe("Settings Service - Get Profile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should throw an error if user not found", async () => {
    const userId = 101;
    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(null); // return null
    await expect(SettingsService.getUserProfile(userId)).rejects.toThrow(
      "User not found!",
    );
  });

  it("should return user data from database", async () => {
    const mockedUser = {
      id: 290,
      fullname: "Hackhim Badman",
      email: "example@gmail.com",
      currency: "USD",
    };

    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(
      mockedUser as any,
    );

    const result = await SettingsService.getUserProfile(mockedUser.id);
    expect(UserRepository.findUserById).toHaveBeenCalledWith(mockedUser.id);
    expect(result).toMatchObject({
      fullname: "Hackhim Badman",
      email: "example@gmail.com",
    });
  });
});

describe("Settings Controller - Update Profile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should return user profile successfully", async () => {
    const mockedUserInstance = {
      id: 290,
      fullname: "Hackhim Badman",
      email: "example@gmail.com",
      currency: "USD",
      update: vi.fn().mockResolvedValue(true),
    };

    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(
      mockedUserInstance as any,
    );

    const updateData = {
      fullname: "Updated Fullname",
      email: "updated@example.com",
      currency: "EUR",
    };

    const result = await SettingsService.updateUserProfile(
      mockedUserInstance.id,
      updateData,
    );

    expect(UserRepository.findUserById).toHaveBeenCalledWith(
      mockedUserInstance.id,
    );
    expect(mockedUserInstance.update).toHaveBeenCalledWith(updateData);

    expect(result).toMatchObject(updateData);
  });
});

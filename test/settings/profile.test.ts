import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import SettingsService from "../../src/services/settings.service";

describe("GetProfile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should throw an error if user not found", async () => {
    const userId = 101;
    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(null);
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

describe("updateUserProfile", () => {
  it("should update and return the updated user profile", async () => {
    const mockedUserInstance = {
      id: 290,
      fullname: "Old Name",
      email: "old@example.com",
      currency: "USD",
      update: vi.fn().mockImplementation(function (data) {
        Object.assign(mockedUserInstance, data);
        return true;
      }),
    };

    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(
      mockedUserInstance as any,
    );

    const updateData = {
      fullname: "Updated Fullname",
      email: "updated@example.com",
      currency: "EUR",
    };

    const result = await SettingsService.updateUserProfile(290, updateData);

    expect(UserRepository.findUserById).toHaveBeenCalledWith(290);
    expect(mockedUserInstance.update).toHaveBeenCalledWith(updateData);

    expect(result).toMatchObject({
      fullname: "Updated Fullname",
      email: "updated@example.com",
      currency: "EUR",
    });
  });

  it("should throw error if user doesn't exist during update", async () => {
    vi.spyOn(UserRepository, "findUserById").mockResolvedValue(null);

    await expect(
      SettingsService.updateUserProfile(99, { fullname: "Fail" }),
    ).rejects.toThrow("User not found!");
  });
});

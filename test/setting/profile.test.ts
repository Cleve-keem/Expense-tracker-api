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

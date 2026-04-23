import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import AuthService from "../../src/services/auth.service";
import bcrypt from "bcryptjs";

vi.mock("bcrypt");

describe("Auth Service - Login", () => {
  const mockLoginInput = {
    email: "hackhim@test.com",
    password: "Ayomide@22",
  };

  const mockUserInstance = {
    id: 1,
    ...mockLoginInput,
    isVerified: false,
    fullname: "Hakeem Bello",
    dataValues: {
      id: 1,
      password: "HashedPassword123",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fail if user doesn't exist", async () => {
    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(null);

    await expect(AuthService.loginUser(mockLoginInput)).rejects.toThrow(
      "Invalid credentials!",
    );
  });

  it("should pass if user email exists", async () => {
    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(
      mockUserInstance as any,
    );
    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as any);

    const result = await AuthService.loginUser(mockLoginInput);

    expect(result).toBeDefined();
  });

  it("should verify user and generate token", async () => {
    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(
      mockUserInstance as any,
    );
    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as any);

    const result = await AuthService.loginUser(mockLoginInput);

    expect(result).toHaveProperty("user");
    expect(result).toHaveProperty("accessToken");
    expect(result).toHaveProperty("refreshToken");
  });
});

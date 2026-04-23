import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRepository from "../../src/repositories/user.repository";
import AuthService from "../../src/services/auth.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

vi.mock("../../src/repositories/user.repository.ts");
vi.mock("bcrypt");
vi.mock("jwt");

describe("Auth Service - Register Login", () => {
  const fakeHash = "myhashedpassword_12345";
  const fake_JWT_token = "myfakejwttoken";

  const mockInput = {
    fullname: "Hakeem Bello",
    email: "hakeembello@gmail.com",
    password: "Ayomiku@22",
    currency: "NGN" as const,
  };

  const mockSavedUser = {
    id: 1,
    ...mockInput,
    isVerified: false,
    password: fakeHash,
    dataValues: {
      id: 1,
      password: fakeHash,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if user already exists", async () => {
    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue({
      email: "hakeembello@gmail.com",
    } as any);

    await expect(AuthService.registerUser(mockInput)).rejects.toThrow(
      "User email already exist",
    );
  });

  it("should hash user password", async () => {
    const hashSpy = vi.spyOn(bcrypt, "hash").mockResolvedValue(fakeHash as any);
    const result = await bcrypt.hash("password123", 10);

    expect(hashSpy).toHaveBeenCalledWith("password123", 10);
    expect(result).toBe(fakeHash);
  });

  it("should create, save and return user with hashed password", async () => {
    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(null);
    vi.spyOn(bcrypt, "hash").mockResolvedValue(fakeHash as any);
    const createSpy = vi
      .spyOn(UserRepository, "createAndSaveUser")
      .mockResolvedValue(mockSavedUser as any);

    const result = await AuthService.registerUser(mockInput);

    expect(result).toMatchObject({
      user: {
        id: 1,
        fullname: "Hakeem Bello",
        currency: "NGN",
      },
    });
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({ password: fakeHash }),
    );
  });

  it("should create user and genereate user token", async () => {
    vi.spyOn(jwt, "sign").mockReturnValue(fake_JWT_token as any);
    vi.spyOn(bcrypt, "hash").mockResolvedValue(fakeHash as any);
    vi.spyOn(UserRepository, "findUserByEmail").mockResolvedValue(null);
    const createSpy = vi
      .spyOn(UserRepository, "createAndSaveUser")
      .mockResolvedValue(mockSavedUser as any);

    const result = await AuthService.registerUser(mockInput);

    expect(result).toMatchObject({
      user: {
        id: 1,
        fullname: "Hakeem Bello",
      },
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({ password: fakeHash }),
    );
  });
});

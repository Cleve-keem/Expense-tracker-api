import z from "zod";

const currencyEnum = z.enum(["NGN", "USD", "EUR"]);

const authBase = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Missing uppercase")
    .regex(/[a-z]/, "Missing lowercase")
    .regex(/[0-9]/, "Missing number")
    .regex(/[@$!%*?&]/, "Missing special character"),
});

// RegisterationSchema
export const registerationSchema = authBase.extend({
  fullname: z
    .string()
    .trim()
    .min(7, "Fullname must be at least 7 characters long")
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Please enter both a first and last name",
    }),
  currency: currencyEnum.default("NGN"),
});

// LoginSchema
export const loginSchema = authBase.extend({});

// Types
export type RegisterInput = z.infer<typeof registerationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

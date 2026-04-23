import { z } from "zod";

export const requestResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type RequestResetInput = z.infer<typeof requestResetSchema>;
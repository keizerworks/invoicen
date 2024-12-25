import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine((password) => /[A-Z]/.test(password), {
      message: "At least one uppercase letter is required",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "At least one lowercase letter is required",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "At least one digit is required",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "At least one special character is required",
    }),
  name: z.string(),
});

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

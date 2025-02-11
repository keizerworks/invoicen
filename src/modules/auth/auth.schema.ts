import { z } from 'zod';

export const postSignupBodySchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(3, { message: 'name must be at least 3 characters long' }),
  email: z
    .string({ required_error: 'email is required' })
    .email({ message: 'please enter a valid email' }),
  password: z
    .string({ required_error: 'password is required' })
    .min(6, { message: 'password must be at least 6 characters long' }),
});

export type PostSignupBody = z.infer<typeof postSignupBodySchema>;

export const postVerifyOtpBodySchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email({ message: 'please enter a valid email' }),
  otp: z
    .number({ required_error: 'otp is required' })
    .min(1000, { message: 'otp must be a 4 digit number' })
    .max(9999, { message: 'otp must be a 4 digit number' }),
});

export type PostVerifyOtpBody = z.infer<typeof postVerifyOtpBodySchema>;

export const postResendOtpEmailBodySchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email({ message: 'please enter a valid email' }),
});

export type PostResendOtpEmailBody = z.infer<
  typeof postResendOtpEmailBodySchema
>;

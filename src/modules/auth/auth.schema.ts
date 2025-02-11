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

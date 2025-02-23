import { z } from 'zod';

export const postClientBodySchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(3, { message: 'name must be at least 3 characters long' }),
  email: z
    .string({ required_error: 'email is required' })
    .email({ message: 'please enter a valid email' }),
  phone: z
    .string({ required_error: 'phone is required' })
    .min(10, { message: 'phone must be at least 10 characters long' }),
  address: z
    .string({ required_error: 'address is required' })
    .min(10, { message: 'address must be at least 10 characters long' }),
  company_name: z
    .string({ required_error: 'company_name is required' })
    .min(3, { message: 'company_name must be at least 3 characters long' }),
  tax_id: z
    .string()
    .min(3, { message: 'tax_id must be at least 3 characters long' })
    .optional(),
});

export type PostClientBody = z.infer<typeof postClientBodySchema>;

export const putUpdateClientBodySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'name must be at least 3 characters long' })
    .optional(),
  email: z
    .string()
    .email({ message: 'please enter a valid email' })
    .optional(),
  phone: z
    .string()
    .min(10, { message: 'phone must be at least 10 characters long' })
    .optional(),
  address: z
    .string()
    .min(10, { message: 'address must be at least 10 characters long' })
    .optional(),
  company_name: z
    .string()
    .min(3, { message: 'company_name must be at least 3 characters long' })
    .optional(),
  tax_id: z
    .string()
    .min(3, { message: 'tax_id must be at least 3 characters long' })
    .optional(),
});

export type putUpdateClientBodySchema = z.infer<
  typeof putUpdateClientBodySchema
>;

import { z } from 'zod';

export const postOnboardingSchema = z.object({
  org_name: z.string({ required_error: 'organization name is required' }),
  org_slug: z.string({ required_error: 'slug is required' }),
  org_logo: z
    .instanceof(Buffer)
    .optional()
    .or(z.string().url().optional()),
  tax_id: z
    .string()
    .min(3, { message: 'tax_id must be at least 3 characters long' })
    .optional(),
  phone: z
    .string({ required_error: 'phone is required' })
    .min(10, { message: 'phone must be at least 10 characters long' }),
  address: z
    .string({ required_error: 'address is required' })
    .min(10, { message: 'address must be at least 10 characters long' }),
});

export type PostOnboardingBody = z.infer<typeof postOnboardingSchema>;

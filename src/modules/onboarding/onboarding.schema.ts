import { z } from 'zod';

export const postOnboardingSchema = z.object({
  org_name: z.string({ required_error: 'organization name is required' }),
  org_slug: z.string({ required_error: 'slug is required' }),
  org_logo: z
    .instanceof(Buffer)
    .optional()
    .or(z.string().url().optional()),
});

export type PostOnboardingBody = z.infer<typeof postOnboardingSchema>;

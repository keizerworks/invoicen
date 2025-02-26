import { z } from "zod";

export const postUpdateUserProfileSchema = z.object({
    name: z.string().optional(),
});

export type postUpdateUserProfileBody = z.infer<typeof postUpdateUserProfileSchema>;

export const postUpdateUserOrganizationSchema = z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    logo_url: z.string().optional(),
    tax_id: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
});

export type postUpdateUserOrganizationBody = z.infer<typeof postUpdateUserOrganizationSchema>;
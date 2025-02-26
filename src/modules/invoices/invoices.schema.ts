import { z } from "zod";

export const postUpdateInvoiceSchema = z.object({
    dueDate: z.string().optional(),
    issuedDate: z.string().optional(),
    clientId: z.string(),
    status: z.string().optional(),
    invoiceNumber: z.string().optional(),
    items: z.array(
        z.object({
            name: z.string().optional(),
            quantity: z.number().optional(),
            unitPrice: z.number().optional(),
        })
    ),
    totalAmount: z.number().optional(),
    currency: z.string().optional(),
    taxes: z.array(
        z.object({
            type: z.string().optional(),
            percentage: z.number().optional(),
            amount: z.number().optional(),
        })
    ),
    taxTotal: z.number().optional(),
    discount: z.number().optional(),
    notes: z.string().optional(),
    termsAndConditions: z.string().optional(),
    templateId: z.string().optional(),
});

export const postInvoiceSchema = z.object({
    dueDate: z.string().optional(),
    issuedDate: z.string({ required_error: "issued date is required" }),
    clientId: z.string({ required_error: "client id is required" }),
    status: z.string().optional(),
    invoiceNumber: z.string().optional(),
    items: z.array(
        z.object({
            name: z.string({ required_error: "name is required" }),
            quantity: z.number({ required_error: "quantity is required" }),
            unitPrice: z.number({ required_error: "unit price is required" }),
        })
    ),
    totalAmount: z.number({ required_error: "total amount is required" }),
    currency: z.string().optional(),
    taxes: z.array(
        z.object({
            type: z.string({ required_error: "type is required" }),
            percentage: z.number({ required_error: "percentage is required" }),
            amount: z.number({ required_error: "amount is required" }),
        })
    ),
    taxTotal: z.number().optional(),
    discount: z.number().optional(),
    notes: z.string().optional(),
    termsAndConditions: z.string().optional(),
    templateId: z.string().optional(),
});

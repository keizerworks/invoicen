import axios from "axios";

export interface Entry {
  amount: number;
  quantity: number;
  description: string;
}

export interface TaxDetails {
  description: string;
  percentage: number;
}

export interface HeaderDetails {
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  logoBase64?: string | null;
}

export interface BillingDetails {
  billedTo: string;
  payTo: string;
}

interface PostGenerateInvoicePayload {
  entries: Entry[];
  taxDetails: TaxDetails[];
  headerDetails: HeaderDetails;
  billingDetails: BillingDetails;
  customMessage?: string;
  totalAmount: string;
  totalWithTaxAmount: string;
}

export const postGenerateInvoice = async (payload: PostGenerateInvoicePayload) => {
  return axios.post("/api/invoice/generate", payload, {
    responseType: "blob",
  });
};

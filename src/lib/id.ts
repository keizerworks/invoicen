import { ulid } from "ulid";

export const type = {
  // core
  client: "clt",
  user: "usr",

  // invoice related
  invoice: "inv",
  invoice_template: "invt",
  invoice_item: "invi",
  invoice_email: "inve",
} as const;

export const createId = (idType: keyof typeof type) =>
  [type[idType], ulid()].join("_");

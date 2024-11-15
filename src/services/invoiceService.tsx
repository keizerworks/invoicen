import axios from "axios";

// TODO: add proper type
export const postGenerateInvoice = async (payload: unknown) => {
  return axios.post("/api/invoice/generate", payload, {
    responseType: "blob",
  });
};

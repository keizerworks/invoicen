import GenerateInvoice from "@/modules/invoice/pages/GenerateInvoice";

/**
 * TODO:
 * 1. Add a button to remove entries
 * 2. Export the invoice as a PDF
 * 3. Option to add custom logo
 *
 *
 * Fields:
 * 1. Invoice Id
 * 2. Invoice date
 * 3. Invoice due date
 * 4. Payment terms
 * 5. Entries
 * 		- Description
 * 		- Quantity
 * 		- Amount
 * 6.	Currency
 * 7.	Billed to
 * 8.	Pay to
 * 9. Tax details
 * 10.Sub total
 * 11.Total
 * 12.Custom message/notes (for payment details etc)
 *
 *
 * Refactor this big component into smaller once [ this is done ]
 */

const Page = () => {
  return <GenerateInvoice />;
};

export default Page;

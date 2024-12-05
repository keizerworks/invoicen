import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import InvoiceHeader from "./InvoiceHeaderPDF";
import BillingInfo from "./BillingInfoPDF";
import EntriesTable from "./EntriesTablePDF";
import TaxDetailsTable from "./TaxDetailsTablePDF";
import InvoiceFooter from "./InvoiceFooterPDF";

interface Entry {
  description: string;
  quantity: number;
  amount: number;
}

interface TaxDetails {
  description: string;
  percentage: number;
}

interface HeaderDetails {
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  logoBase64: string;
}

interface BillingDetails {
  billedTo: string;
  payTo: string;
}

interface GenerateInvoicePDFProps {
  entries: Entry[];
  taxDetails: TaxDetails[];
  headerDetails: HeaderDetails;
  billingDetails: BillingDetails;
  customMessage?: string;
  discount?: number;
}

const GenerateInvoicePDF = ({
  entries,
  taxDetails,
  headerDetails,
  billingDetails,
  customMessage,
  discount = 0,
}: GenerateInvoicePDFProps) => {
  // Calculate total amounts
  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount * entry.quantity, 0);

  const totalTaxPercentage = taxDetails.reduce((sum, tax) => sum + tax.percentage, 0);

  // Subtract the discount and calculate the tax on the remaining amount
  const discountedTotal = totalAmount - discount;
  const totalWithTax = discountedTotal + (discountedTotal * totalTaxPercentage) / 100;

  return (
    <Document>
      <Page style={styles.page}>
        <InvoiceHeader headerDetails={headerDetails} />
        <BillingInfo billingDetails={billingDetails} />
        <EntriesTable entries={entries} totalAmount={totalAmount} />
        <TaxDetailsTable taxDetails={taxDetails} />
        <InvoiceFooter
          totalWithTax={totalWithTax}
          customMessage={customMessage}
          discount={discount}
          totalAmount={totalAmount}
        />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Manrope",
    padding: 30,
    fontSize: 12,
  },
});

export default GenerateInvoicePDF;
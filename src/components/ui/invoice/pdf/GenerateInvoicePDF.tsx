import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import InvoiceHeader from "./InvoiceHeaderPDF";
import BillingInfo from "./BillingInfoPDF";
import EntriesTable from "./EntriesTablePDF";
import TaxDetailsTable from "./TaxDetailsTablePDF";
import InvoiceFooter from "./InvoiceFooterPDF";
import {
  BillingDetails,
  Entry,
  HeaderDetails,
  TaxDetails,
} from "../../../../services/invoiceService";

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
  const activeCurrency = totalAmount.substring(0, 1);
  return (
    <Document>
      <Page style={styles.page}>
        <InvoiceHeader headerDetails={headerDetails} />
        <BillingInfo billingDetails={billingDetails} />
        <EntriesTable entries={entries} totalAmount={totalAmount} activeCurrency={activeCurrency}/>
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
    gap: 28,
  },
});

export default GenerateInvoicePDF;
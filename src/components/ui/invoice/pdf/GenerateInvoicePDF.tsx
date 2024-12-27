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
  totalAmount: string;
  totalWithTax: string;
}

const GenerateInvoicePDF = ({
  entries,
  taxDetails,
  headerDetails,
  billingDetails,
  customMessage,
  totalAmount,
  totalWithTax,
}: GenerateInvoicePDFProps) => {
  const activeCurrency = totalAmount.substring(0, 1);
  return (
    <Document>
      <Page style={styles.page}>
        <InvoiceHeader headerDetails={headerDetails} />
        <BillingInfo billingDetails={billingDetails} />
        <EntriesTable entries={entries} totalAmount={totalAmount} activeCurrency={activeCurrency}/>
        {taxDetails.length > 0 && (
            <TaxDetailsTable taxDetails={taxDetails} />
        )}
        <InvoiceFooter totalWithTax={totalWithTax} customMessage={customMessage} />
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

"use client";

import { useEffect, useState } from "react";
import InvoiceHeader from "./InvoiceHeader";
import BillingInfo from "./BillingInfo";
import EntriesTable from "./EntriesTable";
import TaxDetailsTable from "./TaxDetailsTable";
import InvoiceFooter from "./InvoiceFooter";
import Typography from "../typography";
import { Separator } from "../separator";

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
}

interface BillingDetails {
  billedTo: string;
  payTo: string;
}

const initialEntries: Entry[] = [{ description: "Logo designing", quantity: 20, amount: 250 }];
const initialTaxDetails: TaxDetails[] = [{ description: "GST", percentage: 18 }];

const GenerateInvoice = () => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [taxDetails, setTaxDetails] = useState<TaxDetails[]>(initialTaxDetails);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalWithTax, setTotalWithTax] = useState<number>(0);
  const [headerDetails, setHeaderDetails] = useState<HeaderDetails>({
    invoiceId: "Keizer-00-01", // Default value for demo purposes
    invoiceDate: "11/12/2006", // Default value for demo purposes
    dueDate: "11/12/2006", // Default value for demo purposes
    paymentTerms: "30 days", // Default value for demo purposes
  });
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    billedTo: "John Doe",
    payTo: "Keizer",
  });

  useEffect(() => {
    const subtotal = entries.reduce((sum, entry) => sum + entry.amount * entry.quantity, 0);
    setTotalAmount(subtotal);

    const totalTax = taxDetails.reduce((sum, tax) => sum + tax.percentage, 0);
    setTotalWithTax(subtotal + (subtotal * totalTax) / 100);
  }, [entries, taxDetails]);

  return (
    <main className="md:px-6 px-4 max-w-[1200px] mx-auto">
      <Typography variant="h2" className="text-2xl md:px-0 font-bold">
        Create your invoice
      </Typography>
      <div className="shadow-xl md:my-6 my-4 md:px-8 flex flex-col gap-4 rounded">
        <InvoiceHeader headerDetails={headerDetails} setHeaderDetails={setHeaderDetails} />
        <Separator />
        <BillingInfo billingDetails={billingDetails} setBillingDetails={setBillingDetails} />
        <EntriesTable entries={entries} setEntries={setEntries} totalAmount={totalAmount} />
        <Separator />
        <TaxDetailsTable taxDetails={taxDetails} setTaxDetails={setTaxDetails} />
        <InvoiceFooter totalWithTax={totalWithTax} />
      </div>
    </main>
  );
};

export default GenerateInvoice;

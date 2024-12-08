"use client";

import React, { useContext, useEffect, useState } from "react";
import InvoiceHeader from "./InvoiceHeader";
import BillingInfo from "./BillingInfo";
import EntriesTable from "./EntriesTable";
import TaxDetailsTable from "./TaxDetailsTable";
import InvoiceFooter from "./InvoiceFooter";
import Typography from "../typography";
import { Separator } from "../separator";
import { useMutation } from "@tanstack/react-query";
import { postGenerateInvoice } from "../../../services/invoiceService";
import { extractFileNameFromContentDisposition } from "../../../lib/utils";
import DiscountDetailsTable from "./DiscountDetailsTable";


const initialEntries: Entry[] = [];
const initialTaxDetails: TaxDetails[] = [];

const GenerateInvoice = () => {
  const { activeCurrency } = useContext(CurrencyContext);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [taxDetails, setTaxDetails] = useState<TaxDetails[]>(initialTaxDetails);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalWithTax, setTotalWithTax] = useState<number>(0);
  const [headerDetails, setHeaderDetails] = useState<HeaderDetails>({
    invoiceId: "",
    invoiceDate: new Date().toLocaleDateString("en-IN"),
    dueDate: new Date().toLocaleDateString("en-IN"),
    paymentTerms: "",
  });
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    billedTo: "",
    payTo: "",
  });
  const [discountDetails, setDiscountDetails] = useState([
    { description: "New Year Discount", amount: 100 },
  ]);
  
  const [discountedAmount, setDiscountedAmount] = useState<number>(0);

  useEffect(() => {
    const subtotal = entries.reduce((sum, entry) => sum + entry.amount * entry.quantity, 0);
    setTotalAmount(subtotal);
  
    const totalTax = taxDetails.reduce((sum, tax) => sum + tax.percentage, 0);
    const totalWithTaxes = subtotal + (subtotal * totalTax) / 100;
  
    const totalDiscount = discountDetails.reduce((sum, discount) => sum + discount.amount, 0);
    setDiscountedAmount(totalDiscount);
  
    setTotalWithTax(totalWithTaxes - totalDiscount);
  }, [entries, taxDetails, discountDetails]);


  const mutation = useMutation({
    mutationKey: ["generateInvoice"],
    mutationFn: postGenerateInvoice,
    onSuccess: (res) => {
      // Extract filename from Content-Disposition header
      const filename = extractFileNameFromContentDisposition(res.headers["content-disposition"]);

      // Create a URL for the PDF blob
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      // Append to the document and trigger download
      document.body.appendChild(link);
      link.click();
      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });

  const onInvoiceGenerate = () => {
    mutation.mutateAsync({
      entries,
      taxDetails,
      headerDetails,
      billingDetails,
      totalAmount: formatToCurrency(totalAmount, activeCurrency),
      totalWithTaxAmount: formatToCurrency(totalWithTax, activeCurrency),
    });
  };

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
          <DiscountDetailsTable
            discountDetails={discountDetails}
            setDiscountDetails={setDiscountDetails}
            totalAmount={totalWithTax} // Pass current total with tax
            setTotalAmount={setTotalWithTax} // Update final amount after applying discount
          />

        <InvoiceFooter totalWithTax={totalWithTax} onInvoiceGenerate={onInvoiceGenerate} />
      </div>
    </main>
  );
};

export default GenerateInvoice;

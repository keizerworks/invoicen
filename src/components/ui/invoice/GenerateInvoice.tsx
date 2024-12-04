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
import {
  BillingDetails,
  Entry,
  HeaderDetails,
  postGenerateInvoice,
  TaxDetails,
} from "../../../services/invoiceService";
import { extractFileNameFromContentDisposition, formatToCurrency } from "../../../lib/utils";
import { CurrencyContext } from "../../../providers/CurrencyProvider";

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

  useEffect(() => {
    const subtotal = entries.reduce((sum, entry) => sum + entry.amount * entry.quantity, 0);
    setTotalAmount(subtotal);

    const totalTax = taxDetails.reduce((sum, tax) => sum + tax.percentage, 0);
    // Calculation of Total amount with taxes
    const TotalWithTaxAmount = subtotal + (subtotal * totalTax) / 100;
    // setting the hook and coverting the calculated num to USD Currency format
    setTotalWithTax(TotalWithTaxAmount);
  }, [entries, taxDetails]);

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
    <main className="max-w-7xl px-6 mx-auto mt-10">
      <div className="border-2 shadow-lg px-4 mb-8 rounded-xl">
        <div className=" md:my-6 my-4 flex flex-col gap-7 rounded">
          <InvoiceHeader headerDetails={headerDetails} setHeaderDetails={setHeaderDetails} />
          <BillingInfo billingDetails={billingDetails} setBillingDetails={setBillingDetails} />
          <EntriesTable entries={entries} setEntries={setEntries} totalAmount={totalAmount} />
          <TaxDetailsTable taxDetails={taxDetails} setTaxDetails={setTaxDetails} />
          <InvoiceFooter totalWithTax={totalWithTax} onInvoiceGenerate={onInvoiceGenerate} />
        </div>
      </div>
    </main>
  );
};

export default GenerateInvoice;

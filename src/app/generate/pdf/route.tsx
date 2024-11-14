import { Font, renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import GenerateInvoicePDF from "../../../components/ui/invoice/pdf/GenerateInvoicePDF";
import path from "path";

export const GET = async () => {
  Font.register({
    family: "Manrope",
    fonts: [
      {
        src: path.join(process.cwd(), "public", "fonts", "Manrope-Bold.ttf"),
        fontWeight: "bold",
      },
      {
        src: path.join(
          process.cwd(),
          "public",
          "fonts",
          "Manrope-SemiBold.ttf",
        ),
        fontWeight: "semibold",
      },
      {
        src: path.join(process.cwd(), "public", "fonts", "Manrope-Medium.ttf"),
        fontWeight: "medium",
      },
      {
        src: path.join(process.cwd(), "public", "fonts", "Manrope-Light.ttf"),
        fontWeight: "light",
      },
      {
        src: path.join(process.cwd(), "public", "fonts", "Manrope-Regular.ttf"),
      },
    ],
  });

  const entries = [
    { description: "Logo designing", quantity: 20, amount: 250 },
    // Add more entries as needed
  ];

  const taxDetails = [
    { description: "GST", percentage: 18 },
    // Add more tax details as needed
  ];

  const headerDetails = {
    invoiceId: "Keizer-00-01",
    invoiceDate: "11/12/2006",
    dueDate: "11/12/2006",
    paymentTerms: "30 days",
  };

  const billingDetails = {
    billedTo: "John Doe",
    payTo: "Keizer",
  };

  const customMessage = "Please make the payment by the due date.";

  const stream = await renderToStream(
    <GenerateInvoicePDF
      entries={entries}
      taxDetails={taxDetails}
      headerDetails={headerDetails}
      billingDetails={billingDetails}
      customMessage={customMessage}
    />,
  );

  return new NextResponse(stream as unknown as ReadableStream);
};

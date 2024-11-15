import { Font, renderToStream } from "@react-pdf/renderer";
import { type NextRequest, NextResponse } from "next/server";
import GenerateInvoicePDF from "../../../../components/ui/invoice/pdf/GenerateInvoicePDF";
import path from "path";

export const POST = async (request: NextRequest) => {
  Font.register({
    family: "Manrope",
    fonts: [
      {
        src: path.join(process.cwd(), "public", "fonts", "Manrope-Bold.ttf"),
        fontWeight: "bold",
      },
      {
        src: path.join(process.cwd(), "public", "fonts", "Manrope-SemiBold.ttf"),
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

  const { entries, taxDetails, headerDetails, billingDetails, customMessage } =
    await request.json();

  const stream = await renderToStream(
    <GenerateInvoicePDF
      entries={entries}
      taxDetails={taxDetails}
      headerDetails={headerDetails}
      billingDetails={billingDetails}
      customMessage={customMessage}
    />,
  );

  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    },
  });
};

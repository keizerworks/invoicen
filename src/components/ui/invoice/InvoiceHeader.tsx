import Typography from "@/components/ui/typography";
import Image from "next/image";
import { Input } from "../input";
import type React from "react";

interface HeaderDetails {
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
}

interface InvoiceHeaderProps {
  headerDetails: HeaderDetails;
  setHeaderDetails: React.Dispatch<React.SetStateAction<HeaderDetails>>;
}

const InvoiceHeader = ({ headerDetails, setHeaderDetails }: InvoiceHeaderProps) => {
  const onChangeHandler = (key: keyof HeaderDetails, value: string) => {
    setHeaderDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex items-center justify-between">
      {/* Basic details */}
      <div>
        <Typography variant="h2" className="font-semibold">
          Invoice
        </Typography>

        <div className="flex items-center justify-between w-full mt-2">
          <Typography variant="p" className="md:text-lg text-sm font-semibold">
            Invoice Id:
          </Typography>
          <Input
            value={headerDetails?.invoiceId}
            onChange={(e) => onChangeHandler("invoiceId", e.target.value)}
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <Typography variant="p" className="md:text-lg text-sm font-semibold">
            Invoice Date:
          </Typography>
          {/* TODO: open calendar when clicked on this */}
          <Input
            value={headerDetails?.invoiceDate}
            onChange={(e) => onChangeHandler("invoiceDate", e.target.value)}
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <Typography variant="p" className="md:text-lg text-sm font-semibold">
            Due Date:
          </Typography>
          {/* TODO: open calendar when clicked on this */}
          <Input
            value={headerDetails?.dueDate}
            onChange={(e) => onChangeHandler("dueDate", e.target.value)}
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <Typography variant="p" className="md:text-lg text-sm font-semibold">
            Payment terms:
          </Typography>
          <Input
            value={headerDetails?.paymentTerms}
            onChange={(e) => onChangeHandler("paymentTerms", e.target.value)}
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2"
          />
        </div>
      </div>
      {/* Logo */}
      <div>
        {/* TODO: Make this a placeholder instead of a hard coded logo */}
        <Image
          src={"/assets/logos/logo-icon-dark.svg"}
          alt="Custom Logo"
          height={120}
          width={120}
        />
      </div>
    </div>
  );
};

export default InvoiceHeader;

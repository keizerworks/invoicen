import Typography from "@/components/ui/typography";
import Image from "next/image";
import { Input } from "../input";
import { InputSelect } from "../input-select";
import type React from "react";
import { FileIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface HeaderDetails {
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
}

interface InvoiceHeaderProps {
  headerDetails: HeaderDetails;
  activeCurrency: string;
  setHeaderDetails: React.Dispatch<React.SetStateAction<HeaderDetails>>;
  setActiveCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const LogoPlaceholder: React.FC = () => {
  return (
    <div className="rounded border-2 border-dashed bg-white dark:bg-black w-32 h-32 flex items-center justify-center flex-col cursor-pointer transition-colors hover:bg-muted dark:hover:bg-neutral-950">
      <FileIcon className="h-10 w-10 text-muted-foreground" />
      <Typography className="text-muted-foreground">Logo</Typography>
    </div>
  );
};

const UploadLogo: React.FC = () => {
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedLogo(URL.createObjectURL(e.target.files[0]));
    } else {
      setUploadedLogo(null);
    }
  };

  return (
    <div>
      <label htmlFor="logo-upload" className="cursor-pointer">
        {uploadedLogo ? (
          <Image src={uploadedLogo} alt="Logo" height={120} width={120} />
        ) : (
          <LogoPlaceholder />
        )}
      </label>
      <Input
        type="file"
        id="logo-upload"
        className="hidden"
        onChange={onChangeHandler}
        accept="image/png, image/jpg, image/jpeg"
      />
    </div>
  );
};

const InvoiceHeader = ({
  headerDetails,
  setHeaderDetails,
  activeCurrency,
  setActiveCurrency
}: InvoiceHeaderProps) => {
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
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2 bg-transparent"
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
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2 bg-transparent"
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
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2 bg-transparent"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <Typography variant="p" className="md:text-lg text-sm font-semibold">
            Payment terms:
          </Typography>
          <Input
            value={headerDetails?.paymentTerms}
            onChange={(e) => onChangeHandler("paymentTerms", e.target.value)}
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2 bg-transparent"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <Typography variant="p" className="md:text-lg text-sm font-semibold">
            Invoice Currency:
          </Typography>
          <InputSelect
            activeCurrency={activeCurrency}
            setActiveCurrency={setActiveCurrency}
            value={activeCurrency}
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2 bg-transparent"
          />
        </div>
      </div>
      {/* Logo */}
      <div>
        <UploadLogo />
        {/* TODO: Make this a placeholder instead of a hard coded logo */}
      </div>
    </div>
  );
};

export default InvoiceHeader;

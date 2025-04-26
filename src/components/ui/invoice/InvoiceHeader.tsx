import Typography from "@/components/ui/typography";
import Image from "next/image";
import { Input } from "../input";
import type React from "react";
import { FileIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { HeaderDetails } from "../../../services/invoiceService";
import { InfoIcon } from "../info-icon";

interface InvoiceHeaderProps {
  headerDetails: HeaderDetails;
  setHeaderDetails: React.Dispatch<React.SetStateAction<HeaderDetails>>;
}

const LogoPlaceholder: React.FC = () => {
  return (
    <div className="border-2 border-dashed bg-white dark:bg-black w-40 h-40 rounded-xl flex items-center justify-center flex-col cursor-pointer transition-colors hover:bg-muted dark:hover:bg-neutral-950">
      <FileIcon className="h-10 w-10 text-muted-foreground" />
      <Typography className="text-muted-foreground">Logo</Typography>
    </div>
  );
};

interface IUploadLogoProps {
  setHeaderDetails: React.Dispatch<React.SetStateAction<HeaderDetails>>;
}

const UploadLogo: React.FC<IUploadLogoProps> = ({ setHeaderDetails }) => {
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedLogo(base64String);
        // Update headerDetails with the Base64 logo
        setHeaderDetails((prev) => ({
          ...prev,
          logoBase64: base64String,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedLogo(null);
      // Remove logo from headerDetails if no file is selected
      setHeaderDetails((prev) => ({
        ...prev,
        logoBase64: null,
      }));
    }
  };

  return (
    <div>
      <label htmlFor="logo-upload" className="cursor-pointer">
        {uploadedLogo ? (
          <Image className="rounded-xl" src={uploadedLogo} alt="Logo" height={120} width={120} />
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

const InvoiceHeader = ({ headerDetails, setHeaderDetails }: InvoiceHeaderProps) => {
  const onChangeHandler = (key: keyof HeaderDetails, value: string) => {
    setHeaderDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-0 md:items-center justify-between">
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
            placeholder="Add invoice id"
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
            placeholder="Add invoice date"
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
            placeholder="Add due date"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Typography variant="p" className="md:text-lg text-sm font-semibold">
              Payment terms:
            </Typography>
            <InfoIcon content="How you want your payment? eg: $100 per hour, or split 50-50 between start and end" />
          </div>
          <Input
            value={headerDetails?.paymentTerms}
            onChange={(e) => onChangeHandler("paymentTerms", e.target.value)}
            className="md:text-lg text-sm ml-[5rem] text-right border-none w-fit mt-2 bg-transparent"
            placeholder="Add payment terms"
          />
        </div>
      </div>
      {/* Logo */}
      <div>
        <UploadLogo setHeaderDetails={setHeaderDetails} />
      </div>
    </div>
  );
};

export default InvoiceHeader;

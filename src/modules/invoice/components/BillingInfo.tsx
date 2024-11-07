import Typography from "@/components/ui/typography";
import type React from "react";
import { Textarea } from "@/components/ui/textarea";

interface BillingDetails {
  billedTo: string;
  payTo: string;
}

interface BillingInfoProps {
  billingDetails: BillingDetails;
  setBillingDetails: React.Dispatch<React.SetStateAction<BillingDetails>>;
}

const BillingInfo: React.FC<BillingInfoProps> = ({ billingDetails, setBillingDetails }) => {
  const onChangeHandler = (key: keyof BillingDetails, value: string) => {
    setBillingDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="w-1/2">
        <Typography variant="h3" className="font-semibold">
          Billed To
        </Typography>
        <Textarea
          value={billingDetails?.billedTo}
          onChange={(e) => onChangeHandler("billedTo", e.target.value)}
          className="md:text-lg text-sm shadow-none text-left border-none w-fit mt-2"
        />
      </div>
      <div className="w-1/2">
        <Typography variant="h3" className="font-semibold">
          Pay To
        </Typography>
        <Textarea
          value={billingDetails?.payTo}
          onChange={(e) => onChangeHandler("payTo", e.target.value)}
          className="md:text-lg text-sm shadow-none text-left border-none w-fit mt-2"
        />
      </div>
    </div>
  );
};

export default BillingInfo;

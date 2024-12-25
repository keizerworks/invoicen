import Typography from "@/components/ui/typography";
import type React from "react";
import { Textarea } from "@/components/ui/textarea";
import { BillingDetails } from "../../../services/invoiceService";

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
    <div className="flex my-4 flex-col md:flex-row md:items-center gap-6 md:gap-32">
      <div>
        <Typography variant="h3" className="font-semibold">
          Billed To
        </Typography>
        <Textarea
            value={billingDetails?.billedTo}
            onChange={(e) => onChangeHandler("billedTo", e.target.value)}
            className="md:text-lg text-sm shadow-none text-left border-none w-full md:w-fit mt-2"
            placeholder="Address"
            style={{
              scrollbarWidth: 'none', 
            }}
        />
      </div>
      <div>
        <Typography variant="h3" className="font-semibold">
          Pay To
        </Typography>
        <Textarea
          value={billingDetails?.payTo}
          onChange={(e) => onChangeHandler("payTo", e.target.value)}
          className="md:text-lg text-sm shadow-none text-left border-none  w-full md:w-fit mt-2"
          placeholder="Address"
          style={{
            scrollbarWidth: 'none', 
          }}
        />
      </div>
    </div>
  );
};

export default BillingInfo;

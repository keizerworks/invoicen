import Typography from "@/components/ui/typography";
import { Button } from "../button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../separator";
import { useContext, type FC } from "react";
import { formatToCurrency } from "../../../lib/utils";
import { CurrencyContext } from "../../../providers/CurrencyProvider";

interface InvoiceFooterProps {
  totalWithTax: number;
  onInvoiceGenerate: () => void;
  customMessage: string;
  setCustomMessage: React.Dispatch<React.SetStateAction<string>>;
}

const InvoiceFooter: FC<InvoiceFooterProps> = ({
  totalWithTax,
  onInvoiceGenerate,
  customMessage,
  setCustomMessage,
}) => {
  const { activeCurrency } = useContext(CurrencyContext);
  return (
    <div className="my-4 space-y-4 w-full ">
      <div className="flex items-center justify-end w-full">
        <Typography variant="h3" className="font-semibold text-lg md:text-2xl">
          Total:
        </Typography>
        <Typography variant="h3" className="ml-[1rem]">
          {formatToCurrency(totalWithTax, activeCurrency)}
        </Typography>
      </div>
      <Separator className="mt-4" />
      <Textarea
        placeholder="Add a custom message"
        className="border-none p-4 shadow-none mt-4"
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
      />
      <div className="flex justify-end">
        <Button className="text-right" onClick={onInvoiceGenerate}>
          Generate Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceFooter;

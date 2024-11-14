import Typography from "@/components/ui/typography";
import { Button } from "../button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../separator";
import { formatDecimal } from "@/lib/utils";

interface InvoiceFooterProps {
  totalWithTax: number;
}

const InvoiceFooter = ({ totalWithTax }: InvoiceFooterProps) => {
  return (
    <div className="space-y-4 my-4 w-full">
      <div className="flex justify-end items-center mt-4 w-full">
        <Typography variant="h3" className="font-semibold">
          Total:
        </Typography>
        <Typography variant="h3" className="ml-[1rem]">
          {/* TODO: format currency */}
          {formatDecimal(totalWithTax)}
        </Typography>
      </div>
      <Separator className="mt-4" />
      <Textarea
        placeholder="Add a custom message"
        className="shadow-none mt-4 border-none"
      />
      <div className="flex justify-end">
        <Button className="text-right">Generate Invoice</Button>
      </div>
    </div>
  );
};

export default InvoiceFooter;

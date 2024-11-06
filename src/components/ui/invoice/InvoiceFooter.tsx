import Typography from "@/components/ui/typography";
import { Button } from "../button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../separator";

interface InvoiceFooterProps {
  totalWithTax: number;
}

const InvoiceFooter = ({ totalWithTax }: InvoiceFooterProps) => {
  return (
    <div className="my-4 space-y-4 w-full ">
      <div className="flex items-center justify-end w-full mt-4">
        <Typography variant="h3" className="font-semibold">
          Total:
        </Typography>
        <Typography variant="h3" className="ml-[1rem]">
          {/* TODO: format currency */}
          {totalWithTax}
        </Typography>
      </div>
      <Separator className="mt-4" />
      <Textarea placeholder="Add a custom message" className="border-none shadow-none mt-4" />
      <div className="flex justify-end">
        <Button className="text-right">Generate Invoice</Button>
      </div>
    </div>
  );
};

export default InvoiceFooter;

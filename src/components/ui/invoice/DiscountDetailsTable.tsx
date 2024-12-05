import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";
import DiscountDetail from "@/components/ui/invoice/DiscountDetail";
import Typography from "@/components/ui/typography";

interface DiscountDetails {
  description: string;
  amount: number;
}

interface DiscountDetailsTableProps {
  discountDetails: DiscountDetails[];
  setDiscountDetails: (discountDetails: DiscountDetails[]) => void;
  totalAmount: number;
  setTotalAmount: (totalAmount: number) => void;
}

const DiscountDetailsTable = ({
  discountDetails,
  setDiscountDetails,
}: DiscountDetailsTableProps) => {
  const addDiscount = () =>
    setDiscountDetails([...discountDetails, { description: "", amount: 0 }]);


  return (
    <div className="mt-4">
      <Typography className="mb-2" variant="h3">Discount Details &nbsp; (Optional)</Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Description</TableCell>
            <TableCell className="text-right p-2 h-8 font-semibold">Amount</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {discountDetails.map((discount, index) => (
            <DiscountDetail
              key={index}
              discount={discount}
              index={index}
              discountDetails={discountDetails}
              updateDiscountDetails={setDiscountDetails}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="cursor-pointer text-center" onClick={addDiscount}>
              Add another discount
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DiscountDetailsTable;

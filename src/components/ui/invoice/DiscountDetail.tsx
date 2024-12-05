import { TableCell, TableRow } from "@/components/ui/table";
import { TripledotDropdown } from "../triple-dot-dropdown";


interface DiscountDetailProps {
  discount: { description: string; amount: number };
  index: number;
  discountDetails: { description: string; amount: number }[];
  updateDiscountDetails: (discountDetails: { description: string; amount: number }[]) => void;
}

const DiscountDetail = ({
  discount,
  index,
  discountDetails,
  updateDiscountDetails,
}: DiscountDetailProps) => {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDiscountDetails = [...discountDetails];
    updatedDiscountDetails[index].description = e.target.value;
    updateDiscountDetails(updatedDiscountDetails);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDiscountDetails = [...discountDetails];
    updatedDiscountDetails[index].amount = parseFloat(e.target.value) || 0;
    updateDiscountDetails(updatedDiscountDetails);
  };

  // removing discount From the list
  const removeDiscount = () => {
    const updatedDiscountDetails = discountDetails.filter((_, i) => i !== index);
    updateDiscountDetails(updatedDiscountDetails);
  };

  return (
    <TableRow key={index} className="relative">
      <TableCell>
        <input
          type="text"
          value={discount.description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
          className="w-full h-10 rounded-md text-center border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0"
        />
      </TableCell>
      <TableCell>
        <input
          type="number"
          value={discount.amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="w-full h-10 rounded-md text-center border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0"
        />
      </TableCell>

      <TableCell className="text-right" > {/* Adjust colSpan value here */}
        <TripledotDropdown deleteInvoice={removeDiscount} />
      </TableCell>
    </TableRow>
  );
};

export default DiscountDetail;

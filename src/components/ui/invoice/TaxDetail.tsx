import { TableCell, TableRow } from "../table";
import { Input } from "../input";
// import { useTheme } from "next-themes";

interface TaxDetail {
  description: string;
  percentage: number;
}

interface TaxDetailProps {
  tax: TaxDetail;
  index: number;
  taxDetails: TaxDetail[];
  updateTaxDetails: (newTaxDetails: TaxDetail[]) => void;
}

const TaxDetail = ({
  tax,
  index,
  taxDetails,
  updateTaxDetails,
}: TaxDetailProps) => {
  // const { theme } = useTheme();
  const handleChange = (field: keyof TaxDetail, value: string | number) => {
    const validatedValue = field === "percentage" ? Number(value) || 0 : value;

    const updatedTaxDetails = taxDetails.map((t, i) =>
      i === index ? { ...t, [field]: validatedValue } : t,
    );

    updateTaxDetails(updatedTaxDetails);
  };

  return (
    <TableRow key={index} className="relative">
      <TableCell className="font-medium">
        <Input
          value={tax.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={`border-none bg-white text-black"  dark:bg-black dark:text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0`}
          placeholder="Enter tax description..."
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={tax.percentage}
          onChange={(e) => handleChange("percentage", e.target.value)}
          min={0}
          className={`border-none bg-white text-black"  dark:bg-black dark:text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0 text-right`}
        />
      </TableCell>
    </TableRow>
  );
};

export default TaxDetail;

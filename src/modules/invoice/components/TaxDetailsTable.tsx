import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";
import TaxDetail from "@/modules/invoice/components/TaxDetail";
import Typography from "@/components/ui/typography";

interface TaxDetails {
  description: string;
  percentage: number;
}

interface TaxDetailsTableProps {
  taxDetails: TaxDetails[];
  setTaxDetails: (taxDetails: TaxDetails[]) => void;
}

const TaxDetailsTable = ({
  taxDetails,
  setTaxDetails,
}: TaxDetailsTableProps) => {
  const addTax = () =>
    setTaxDetails([...taxDetails, { description: "", percentage: 0 }]);

  return (
    <div className="mt-4">
      <Typography variant="h3">Tax Details</Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell className="text-right">Percentage (%)</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxDetails.map((tax, index) => (
            <TaxDetail
              key={index}
              tax={tax}
              index={index}
              taxDetails={taxDetails}
              updateTaxDetails={setTaxDetails}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={2}
              className="cursor-pointer text-center"
              onClick={addTax}
            >
              Add another tax
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TaxDetailsTable;

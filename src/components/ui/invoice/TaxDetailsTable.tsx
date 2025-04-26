import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";
import TaxDetail from "@/components/ui/invoice/TaxDetail";
import Typography from "@/components/ui/typography";
import { TaxDetails } from "../../../services/invoiceService";
import { InfoIcon } from "../info-icon";

interface TaxDetailsTableProps {
  taxDetails: TaxDetails[];
  setTaxDetails: (taxDetails: TaxDetails[]) => void;
}

const TaxDetailsTable = ({ taxDetails, setTaxDetails }: TaxDetailsTableProps) => {
  const addTax = () => setTaxDetails([...taxDetails, { description: "", percentage: 0 }]);

  return (
    <div className="mb-10 mt-4">
      <div className="flex items-center gap-2">
        <Typography variant="h3">Tax Details</Typography>
        <InfoIcon content="Add tax rates that apply to your invoice. Include description and percentage for each tax." />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell className="text-right">Percentage (%)</TableCell>
            <TableCell className="text-right w-[10%]">Actions</TableCell>
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
              colSpan={3} // Keep this as is since there are two columns in the table
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

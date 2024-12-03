import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";
import EntryRow from "@/components/ui/invoice/EntryRow";
import Typography from "@/components/ui/typography";
import { formatToCurrency } from "../../../lib/utils";
import { useContext } from "react";
import { CurrencyContext } from "../../../providers/CurrencyProvider";
import { Entry } from "../../../services/invoiceService";

interface EntriesTableProps {
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  totalAmount: number;
}

const EntriesTable = ({ entries, setEntries, totalAmount }: EntriesTableProps) => {
  const { activeCurrency } = useContext(CurrencyContext);
  const addEntry = () => setEntries([...entries, { description: "", quantity: 0, amount: 0 }]);

  return (
    <div>
      <Typography variant="h3">Entries</Typography>
      <Table className="mt-2">
        <TableHeader>
          <TableRow className="gap-2">
            <TableHead className="w-[50%]">Description</TableHead>
            <TableHead className="w-[25%]">Quantity</TableHead>
            <TableHead className=" w-[25%]">Amount</TableHead>
            <TableHead className="text-right ">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <EntryRow
              key={index}
              entry={entry}
              index={index}
              entries={entries}
              updateEntries={setEntries}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="cursor-pointer text-center" onClick={addEntry}>
              Add another entry
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex items-center justify-end w-full mt-8">
        <Typography variant="h3" className="font-semibold">
          Subtotal:
        </Typography>
        <Typography variant="h3" className="ml-[1rem]">
          {formatToCurrency(totalAmount, activeCurrency)}
        </Typography>
      </div>
    </div>
  );
};

export default EntriesTable;

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

interface Entry {
  description: string;
  quantity: number;
  amount: number;
}

interface EntriesTableProps {
  entries: Entry[];
  setEntries: (entries: Entry[]) => void;
  totalAmount: number;
}

const EntriesTable = ({
  entries,
  setEntries,
  totalAmount,
}: EntriesTableProps) => {
  const addEntry = () =>
    setEntries([...entries, { description: "", quantity: 0, amount: 0 }]);

  return (
    <div className="mt-4">
      <Typography variant="h3">Entries</Typography>
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Description</TableHead>
            <TableHead className="w-[25%]">Quantity</TableHead>
            <TableHead className="text-right w-[25%]">Amount</TableHead>
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
          <TableRow className="h-[60px]">
            <TableCell className="font-semibold text-xl">Subtotal: </TableCell>
            <TableCell
              colSpan={2}
              className="text-right font-semibold text-2xl"
            >
              ${totalAmount}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={4}
              className="cursor-pointer text-center"
              onClick={addEntry}
            >
              Add another entry
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default EntriesTable;

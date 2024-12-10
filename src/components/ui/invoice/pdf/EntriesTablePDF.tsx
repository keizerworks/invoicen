import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Entry } from "../../../../services/invoiceService";

interface EntriesTableProps {
  entries: Entry[];
  totalAmount: string;
  activeCurrency: string;
}

const EntriesTable = ({ entries, totalAmount, activeCurrency }: EntriesTableProps) => {
  const tableRows = entries.map((entry, index) => (
    <View style={styles.row} key={index}>
      <Text style={styles.description}>{entry.description}</Text>
      <Text style={styles.quantity}>{entry.quantity}</Text>
      <Text style={styles.amount}>{activeCurrency}{(entry.amount * entry.quantity).toFixed(2)}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entries</Text>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>
        {tableRows}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>{totalAmount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    width: "auto",
  },
  header: {
    flexDirection: "row",
    borderBottomColor: "#E4E4E7",
    borderBottomWidth: 1,
    color: "#71717A",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#E4E4E7",
    borderBottomWidth: 1,
  },
  description: {
    width: "50%",
    padding: 5,
    fontSize: 12,
  },
  quantity: {
    width: "25%",
    padding: 5,
    fontSize: 12,
    textAlign: "right",
  },
  amount: {
    width: "25%",
    padding: 5,
    fontSize: 12,
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 32,
  },
  totalLabel: {
    padding: 5,
    fontSize: 14,
    textAlign: "right",
    fontWeight: "semibold",
  },
  totalValue: {
    padding: 5,
    fontSize: 14,
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default EntriesTable;

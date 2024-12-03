import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { TaxDetails } from "../../../../services/invoiceService";

interface TaxDetailsTableProps {
  taxDetails: TaxDetails[];
}

const TaxDetailsTable = ({ taxDetails }: TaxDetailsTableProps) => {
  const tableRows = taxDetails.map((tax, index) => (
    <View style={styles.row} key={index}>
      <Text style={styles.description}>{tax.description}</Text>
      <Text style={styles.percentage}>{tax.percentage}%</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tax Details</Text>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.percentage}>Percentage (%)</Text>
        </View>
        {tableRows}
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
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
  },
  description: {
    width: "75%",
    padding: 5,
    fontSize: 12,
  },
  percentage: {
    width: "25%",
    padding: 5,
    fontSize: 12,
    textAlign: "right",
  },
});

export default TaxDetailsTable;

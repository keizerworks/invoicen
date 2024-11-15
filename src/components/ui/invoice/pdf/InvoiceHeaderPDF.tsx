import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";

interface HeaderDetails {
  invoiceId: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
}

interface InvoiceHeaderProps {
  headerDetails: HeaderDetails;
}

const InvoiceHeader = ({ headerDetails }: InvoiceHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.invoiceTitle}>Invoice</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Id:</Text>
          <Text style={styles.value}>{headerDetails.invoiceId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.value}>{headerDetails.invoiceDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Due Date:</Text>
          <Text style={styles.value}>{headerDetails.dueDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment terms:</Text>
          <Text style={styles.value}>{headerDetails.paymentTerms}</Text>
        </View>
      </View>
      <View>
        <Image style={styles.logo} src="http://localhost:3000/assets/logos/logo-icon-dark.png" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    width: "40%",
  },
  value: {
    fontSize: 12,
    textAlign: "right",
    fontWeight: "light",
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default InvoiceHeader;

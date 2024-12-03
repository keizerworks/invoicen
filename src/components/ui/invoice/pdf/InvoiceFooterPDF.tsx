import { View, Text, StyleSheet } from "@react-pdf/renderer";

interface InvoiceFooterProps {
  totalWithTax: string;
  customMessage?: string;
}

const InvoiceFooter = ({ totalWithTax, customMessage }: InvoiceFooterProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{totalWithTax}</Text>
      </View>
      {customMessage && (
        <View>
          <Text style={styles.message}>{customMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "semibold",
    marginRight: 5,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    fontSize: 12,
  },
});

export default InvoiceFooter;

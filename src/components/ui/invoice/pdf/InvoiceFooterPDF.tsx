import { View, Text, StyleSheet } from "@react-pdf/renderer";

interface InvoiceFooterProps {
  totalWithTax: number;
  customMessage?: string;
}

const InvoiceFooter = ({ totalWithTax, customMessage }: InvoiceFooterProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>${totalWithTax.toFixed(2)}</Text>
      </View>
      {customMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{customMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  totalValue: {
    fontSize: 14,
  },
  messageContainer: {
    marginBottom: 10,
  },
  message: {
    fontSize: 12,
  },
  thankYouContainer: {
    marginTop: 10,
  },
  thankYou: {
    fontSize: 12,
  },
});

export default InvoiceFooter;

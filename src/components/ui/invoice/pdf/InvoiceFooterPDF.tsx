import { View, Text, StyleSheet } from "@react-pdf/renderer";

interface InvoiceFooterProps {
  totalWithTax: number; // After tax calculation, including discount
  customMessage?: string; // Optional message
  discount?: number; // Discount value (optional)
  totalAmount: number; // Total before any discount and tax
}

const InvoiceFooter = ({ totalWithTax, discount, totalAmount, customMessage }: InvoiceFooterProps) => {
  return (
    <View style={styles.footer}>
      <View style={styles.summaryContainer}>
        {/* Total Amount Before Discount */}
        <View style={styles.row}>
          <Text style={styles.label}>Total (Before Discount):</Text>
          <Text style={styles.value}>${totalAmount.toFixed(2)}</Text>
        </View>

        {/* Discount (Show only if applicable) */}
        {discount && (
          <View style={styles.row}>
            <Text style={styles.label}>Discount:</Text>
            <Text style={styles.value}>- ${discount.toFixed(2)}</Text>
          </View>
        )}

        {/* Final Total (After Discount and Tax) */}
        <View style={styles.row}>
          <Text style={styles.label}>Total (After Discount & Tax):</Text>
          <Text style={styles.value}>${totalWithTax.toFixed(2)}</Text>
        </View>
      </View>

      {/* Custom Message */}
      {customMessage && <Text style={styles.customMessage}>{customMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1px solid #000",
  },
  summaryContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    textAlign: "right",
  },
  customMessage: {
    marginTop: 10,
    fontStyle: "italic",
  },
});

export default InvoiceFooter;
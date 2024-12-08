import type React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { BillingDetails } from "../../../../services/invoiceService";

interface BillingInfoProps {
  billingDetails: BillingDetails;
}

const BillingInfo: React.FC<BillingInfoProps> = ({ billingDetails }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Billed To</Text>
        <Text style={styles.content}>{billingDetails.billedTo}</Text>
      </View>
      <View>
        <Text style={styles.title}>Pay To</Text>
        <Text style={styles.content}>{billingDetails.payTo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 128,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
  },
});

export default BillingInfo;

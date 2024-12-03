import type React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { BillingDetails } from "../../../../services/invoiceService";

interface BillingInfoProps {
  billingDetails: BillingDetails;
}

const BillingInfo: React.FC<BillingInfoProps> = ({ billingDetails }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Billed To</Text>
        <Text style={styles.content}>{billingDetails.billedTo}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Pay To</Text>
        <Text style={styles.content}>{billingDetails.payTo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  section: {
    width: "45%",
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

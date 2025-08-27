import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { backgroundColor: "#F3F4F6", padding: 20, fontFamily: "Helvetica" },
  header: { textAlign: "center", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold" },
  subTitle: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
  badge: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: 6,
    borderRadius: 10,
    marginTop: 8,
    width: 200,
    alignSelf: "center",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 10,
  },
  remarksBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
    marginHorizontal: 20,
  },
  listItem: { fontSize: 12, marginVertical: 2 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 10,
    fontSize: 12,
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  coverLabel: { fontSize: 14, fontWeight: "bold" },
  coverValue: { fontSize: 16, fontWeight: "bold" },
  receverlable: { fontSize: 14, fontWeight: "bold" },

 
  cutLine: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
    marginVertical: 20,
  },
 
});

const StateReceipt = ({ receiptData }) => {
  console.log("receiptData recipt", receiptData);

  const applicantName =
    receiptData?.name ||
    receiptData?.records?.[0]?.name ||
    "_____________";

  let remarks = [];
  if (Array.isArray(receiptData?.records)) {
    remarks = receiptData.records
      .filter(
        (r) => typeof r.remarks === "string" && r.remarks.trim().length > 0
      )
      .map((r) => ({
        applicantName: r.record_id?.applicantName || "Unknown",
        text: r.remarks.trim(),
      }));
  }

  let rec_head = null;
  if (Array.isArray(receiptData?.records)) {
    rec_head = receiptData.records.find((r) => r?.record_id?.ch === "Ch")
      ?.record_id;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>KERALA STATE HAJ COMMITTEE</Text>
          <Text style={styles.subTitle}>HAJ 2026</Text>
          <Text style={styles.badge}>HAJ APPLICATION RECEIPT</Text>cutLine
        </View>

        <View style={[styles.row, { marginBottom: 10 }]}>
          <Text>No. {receiptData?.reciptNo || "----"}</Text>
          <Text>
            Date:{" "}
            {receiptData?.date
              ? new Date(receiptData.date).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.receverlable}>
            Received from: {rec_head?.applicantName || "_____________"}
          </Text>
        </View>

        {remarks.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ marginLeft: 10 }}>Remarks:</Text>
            <View style={styles.remarksBox}>
              {remarks.map((r, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {idx + 1}. {r.applicantName} — {r.text}
                </Text>
              ))}
            </View>
          </View>
        )}

        
       
        <View  />

        <View style={styles.footer}>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text style={styles.coverLabel}>Cover No:</Text>
            <Text style={styles.coverValue}>
              {receiptData?.cover_id || "__________"}
            </Text>
          </View>

          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text style={[styles.bold, styles.italic]}>
              Signature of Receiving Officer
            </Text>
            <Text style={[styles.bold, styles.italic, { marginTop: 10 }]}>
              {receiptData?.recererId?.name || "_____________"}
            </Text>
          </View>
        </View>
         <View style={{ marginTop: 20, marginBottom: 10 }}>
 
  <View style={styles.cutLine} />
 
</View>
         
      </Page>
    </Document>
  );
};

export default StateReceipt;

import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const styles = StyleSheet.create({
  metricsContainer: {
    marginBottom: 10,
  },
  metricsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 10,
    border: '1px solid #ddd',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  tableCell: {
    padding: 5,
    textAlign: 'left',
    border: '1px solid #ddd',
  },
});

function generatePDF(metrics) {
  console.log('Generating PDF with metrics:', metrics);

  const doc = new jsPDF();
  doc.addPage();
  doc.setFontSize(12);
  doc.text('Metric Information', 10, 10);

  const tableData = [
    ['Metric', 'Value'],
    ['Average CPU Usage', metrics.avg_cpu],
    ['Maximum CPU Usage', metrics.max_cpu],
    ['Average Memory Usage', metrics.avg_mem],
    ['Average Network In', metrics.avg_net_in],
    ['Maximum Network In', metrics.max_net_in],
    // Add more rows as needed
  ];

  doc.autoTable({
    startY: 20,
    head: [['Metric', 'Value']],
    body: tableData,
  });

  doc.save('metrics_report.pdf');
}

function MetricsInfo({ metrics }) {
  console.log('MetricsInfo received metrics:', metrics);

  return (
    <View style={styles.metricsContainer}>
      <button onClick={() => generatePDF(metrics)}>Generate PDF</button>
    </View>
  );
}

export default MetricsInfo;
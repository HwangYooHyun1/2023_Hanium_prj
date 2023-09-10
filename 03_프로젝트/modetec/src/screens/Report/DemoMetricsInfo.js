import React from 'react';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  demoMetricsContainer: {
    marginBottom: 10,
  },
  demoMetricsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  demoMetricsText: {
    fontSize: 12,
    marginBottom: 3,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%', // 2열로 변경
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

function addUnit(metricName, metricValue) {
  if (metricName === 'avg_net_in' || metricName === 'max_net_in' || metricName === 'avg_net_out' || metricName === 'max_net_out') {
    return `${metricValue} MB`; // avg_net_in, max_net_in에는 MB 단위 추가
  } else {
    return `${metricValue}%`; // 나머지는 % 단위 추가
  }
}

function DemoMetricsInfo({ metrics }) {
  return (
    <View style={styles.table}>
      {Object.entries(metrics).map(([metricName, metricValue], index) => (
        <View key={index} style={styles.tableRow}>

          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{metricName}</Text>
          </View>

          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{addUnit(metricName, metricValue)}</Text>
          </View>
          
        </View>
      ))}
    </View>
  );
}

export default DemoMetricsInfo;

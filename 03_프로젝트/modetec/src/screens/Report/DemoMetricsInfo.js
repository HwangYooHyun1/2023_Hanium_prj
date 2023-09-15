import React from 'react';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 25,
    marginRight: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center', // 가운데 정렬 추가
    fontSize: 14,
  },
});

function addUnit(metricValue, metricName) {
  if (metricName.endsWith('NetIn') || metricName.endsWith('NetOut')) {
    return `${metricValue} MB`;
  } else {
    return `${metricValue}%`;
  }
}

function DemoMetricsTable({ metrics }) {
  return (
    <View wrap={false} style={styles.table}>

      <View style={styles.tableRow}>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}></Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>AVG</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>MAX</Text>
        </View>

      </View>

      <View style={styles.tableRow}>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Network In Bytes</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.avgNetIn, 'avgNetIn')}</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.maxNetIn, 'maxNetIn')}</Text>
        </View>

      </View>

      <View style={styles.tableRow}>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Network Out Bytes</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.avgNetOut, 'avgNetOut')}</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.maxNetOut, 'maxNetOut')}</Text>
        </View>

      </View>

      <View style={styles.tableRow}>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>CPU_usage</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.avgCpu, 'avgCpu')}</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.maxCpu, 'maxCpu')}</Text>
        </View>

      </View>

      <View style={styles.tableRow}>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Memory_usage</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.avgMem, 'avgMem')}</Text>
        </View>

        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{addUnit(metrics.maxMem, 'maxMem')}</Text>
        </View>

      </View>



    

    </View>
  );
}

export default DemoMetricsTable;

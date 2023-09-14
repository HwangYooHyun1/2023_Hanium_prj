// RiskLevelCountTable.js
import React from 'react';
import { Page, Text, View, Image, StyleSheet  } from '@react-pdf/renderer';

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
      marginLeft: 25,
      marginRight: 20,
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
      marginTop: 10, // 각 셀의 높이를 20으로 설정
      marginBottom: 10,
      fontSize: 14,
    },
  });

function RiskLevelCountTable({ anomalyData, selectedRiskLevels }) {

    const infoData = anomalyData; // 데이터 배열



      // 리스크 수준 개수 계산 함수
function calculateRiskLevelCounts(data) {
    const counts = {
      High: 0,
      Medium: 0,
      Low: 0,
      Minimal: 0,
    };
  
    data.forEach((item) => {
      const riskLevel = getRiskLevel(item.score);
      counts[riskLevel]++;
    });
  
    return counts;
  }
  const getRiskLevel = (score) => {
    if (score >= 75) {
      return "High";
    } else if (score >= 50) {
      return "Medium";
    } else if (score >= 25) {
      return "Low";
    } else {
      return "Minimal";
    }
  };

  const filteredData = selectedRiskLevels.length > 0
  ? infoData.filter(data => selectedRiskLevels.includes(getRiskLevel(data.score)))
  : infoData;


  const riskLevelCounts = calculateRiskLevelCounts(filteredData);




  return (

    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Risk Level</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Count</Text>
        </View>
      </View>
      {Object.keys(riskLevelCounts).map((level) => (
        <View style={styles.tableRow} key={level}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{level}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{riskLevelCounts[level]}</Text>
          </View>
        </View>
      ))}
      {/* Total Count */}
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Total Count</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{filteredData.length}</Text>
        </View>
      </View>
    </View>
  );
}

export default RiskLevelCountTable;

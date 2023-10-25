import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

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
    padding: 8,
  },
  tableCell: {
 
    textAlign: 'center', // 가운데 정렬 추가
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
  highRisk: {
    backgroundColor: '#fe5050', // High 리스크의 배경색
  },
  mediumRisk: {
    backgroundColor: '#fba740', // Medium 리스크의 배경색
  },
  lowRisk: {
    backgroundColor: '#fddd00', // Low 리스크의 배경색
  },
  minimalRisk: {
    backgroundColor: '#8bc8fb', // Minimal 리스크의 배경색
  },
  whiteBackground: {
    backgroundColor: 'white', // 흰색 배경
  },
});

function RiskLevelCountTable({ anomalyData, selectedRiskLevels }) {
  // 데이터 배열
  const infoData = anomalyData;

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
      <View style={[styles.tableRow, styles.boldText]}>
        <View style={[styles.tableCol, styles.boldText]}>
          <Text style={[styles.tableCell]}>Risk Level</Text>
        </View>
        <View style={[styles.tableCol, styles.boldText, styles.whiteBackground]}>
          <Text style={[styles.tableCell]}>Count</Text>
        </View>
      </View>
      {Object.keys(riskLevelCounts).map((level) => (
        <View style={[styles.tableRow]} key={level}>
          <View style={[styles.tableCol, styles[level.toLowerCase() + 'Risk']]}>
            <Text style={[styles.tableCell]}>{level}</Text>
          </View>
          <View style={[styles.tableCol, styles.whiteBackground]}>
            <Text style={[styles.tableCell]}>{riskLevelCounts[level]}</Text>
          </View>
        </View>
      ))}
      {/* Total Count */}
      <View style={[styles.tableRow, styles.boldText]}>
        <View style={[styles.tableCol, styles.boldText]}>
          <Text style={[styles.tableCell]}>Total Count</Text>
        </View>
        <View style={[styles.tableCol, styles.boldText, styles.whiteBackground]}>
          <Text style={[styles.tableCell]}>{filteredData.length}</Text>
        </View>
      </View>
    </View>
  );
}

export default RiskLevelCountTable;

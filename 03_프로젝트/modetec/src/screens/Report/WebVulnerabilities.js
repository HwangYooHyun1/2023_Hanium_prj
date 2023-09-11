// WebVulnerabilities.js

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
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0,
    marginBottom: 3
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 5, // 셀의 패딩을 추가하여 텍스트와 경계 사이의 간격 조정
    fontSize: 10,
  },
  indexText: {
    fontSize: 12,
    marginBottom: 5, // 추가된 부분: 인덱스 텍스트 아래 여백
    color: '#666', // 인덱스 텍스트의 색상
  },
  statusCell: {
    padding: 5,
    fontSize: 10,
  },
  riskStatus: {
    backgroundColor: 'red', // 빨간색 네모
    color: 'white', // 글씨색을 흰색으로 설정
  },
  safeStatus: {
    backgroundColor: 'green', // 초록색 네모
    color: 'white', // 글씨색을 흰색으로 설정
  },
});

function WebVulnerabilities({ WebVulnerabilityData }) {
  console.log('****웹취약점 데이터 넘어오는거 확인', WebVulnerabilityData);
  console.log('****웹취약점 데이터 넘어오는거 확인', WebVulnerabilityData);


  return (
    <View style={styles.demoMetricsContainer}>
      {WebVulnerabilityData && WebVulnerabilityData.map((data, index) => (
        <View key={index}>

          <Text style={styles.demoMetricsTitle}>
            <Text>WebVulnerabilities</Text>
            <Text style={styles.indexText}>Index: {index}</Text> {/* 추가된 부분 */}
          </Text>

          <View style={styles.table}>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>vulnerability</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.vulnerability}</Text>
              </View>
            </View>
            
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>description</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.description}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>security_threat</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.security_threat}</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>content</Text>
              </View>

              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.content}</Text>
              </View>
            </View>

            {/* status 값에 따라 배경색을 다르게 설정 */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>status</Text>
              </View>

              <View style={[styles.tableCol, styles.statusCell, data.status === 'Risk' ? styles.riskStatus : (data.status === 'Safe' ? styles.safeStatus : {})]}>
  <Text style={styles.tableCell}>
    {data.status}
  </Text>
</View>
            </View>
            
          </View>
        </View>
          ))}
    </View>
  );
}

export default WebVulnerabilities;
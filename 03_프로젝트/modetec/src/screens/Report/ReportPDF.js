import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';
import DemoMetricsInfo from './DemoMetricsInfo'; // Update the path accordingly
import MetricsInfo from './MetricsInfo'; // Update the path accordingly
import AnomalyDetection from './AnomalyDetection';

import BarChartComponent from './BarChartComponent';





const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%', // 페이지 전체 가로 크기 조절
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '50%', // 섹션의 가로 크기 조절
  },
  image: {
    width: 500,
    height: 200,
  },
  centeredImageContainer: {
    display: 'flex',
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center', // 수직 가운데 정렬
  },
});




function ReportPDF({ reportData, anomalyData, chartImage, pieChartImage, selectedRiskLevels, chartImageURL }) {
  return (
    <PDFDownloadLink
      document={
        <ReportPDFDocument
          reportData={reportData}
          anomalyData={anomalyData}
          chartImage={chartImage}
          selectedRiskLevels={selectedRiskLevels}
          chartImageURL={chartImageURL}
          pieChartImage={pieChartImage}

        />
      }
      fileName="report.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? '로딩 중...' : 'PDF 다운로드'}
    </PDFDownloadLink>
  );
}




function ReportPDFDocument({ reportData, anomalyData, chartImage,pieChartImage, selectedRiskLevels, chartImageURL}) {
  console.log('reportData:', reportData); // reportData 로그 출력
  console.log('anomalyData:', anomalyData); // anomalyData 로그 출력
  console.log('chartImage', chartImage, chartImageURL, pieChartImage);

  


  return (
    
    <Document>
      {/* Page 1 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>modetec report</Text>
        </View>

        <View style={styles.centeredImageContainer}>
            <Image src="/image/reportLogo.png" style={styles.image} />
          </View>
        <View style={styles.section}>
          <Text></Text>
        </View>
      </Page>

      {/* Page 4 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Bar Chart</Text>

          {/* BarChartComponent에서 생성한 이미지 데이터 URL을 사용하여 이미지를 표시 */}
          {chartImage && (
            <Image src={chartImage} />
          )}
          {chartImageURL && (
            <Image src={chartImageURL} />
          )}
        </View>
      </Page>

      

      
      {/* Page 2 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>MetricsInfo</Text>
          {reportData.info && (
            <DemoMetricsInfo metrics={reportData.info} />
          )}
        </View>
      </Page>

      {/* Page 3 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Include the AnomalyDetection component here */}
          {anomalyData.info && (
            <AnomalyDetection anomalyData={anomalyData.info} selectedRiskLevels={selectedRiskLevels} />
          )}
        </View>
      </Page>

      

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Anomaly Detection Report</Text>
          
          {/* 다른 컴포넌트들 추가 */}
        </View>
      </Page>

      {/* Page 4 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #2</Text>
          
        </View>

         
        

      </Page>
    </Document>
  );
}

export default ReportPDF;
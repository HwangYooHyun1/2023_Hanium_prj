import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';
import DemoMetricsInfo from './DemoMetricsInfo'; // Update the path accordingly
import MetricsInfo from './MetricsInfo'; // Update the path accordingly
import AnomalyDetection from './AnomalyDetection';

import BarChartComponent from './BarChartComponent';
import WebVulnerabilities from './WebVulnerabilities';





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
    width: 700,
    height: 850,
  },
  centeredImageContainer: {
    display: 'flex',
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center', // 수직 가운데 정렬
  },
  downloadButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 12,
    borderRadius: 6,
    width: 120,
    textAlign: 'center',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function DownloadButton() {
  return (
    <View style={styles.downloadButton}>
      <Text style={styles.buttonText}>다운로드</Text>
    </View>
  );
}


function ReportPDF({ reportData, anomalyData, chartImage,selectedRiskLevels, WebVulnerabilityData}) {
  return (
    <PDFDownloadLink
  document={
    <ReportPDFDocument
      reportData={reportData}
      anomalyData={anomalyData}
      chartImage={chartImage}
      selectedRiskLevels={selectedRiskLevels}
      WebVulnerabilityData={WebVulnerabilityData}
    />
  }
  fileName="report.pdf"
>
  <DownloadButton /> {/* Use the custom styled button */}
</PDFDownloadLink>
  );
}




function ReportPDFDocument({ reportData, anomalyData, chartImage, selectedRiskLevels, WebVulnerabilityData}) {
  console.log('reportData:', reportData); // reportData 로그 출력
  console.log('anomalyData:', anomalyData); // anomalyData 로그 출력
  console.log('chartImage', chartImage);
  console.log('reportPDF-웹취약점 데이터 확인', WebVulnerabilityData.info);

  


  return (
    
    <Document>
      {/* Page 1 */}
      <Page size="A4" style={styles.page}>
            <Image src="/image/001.png" style={styles.image} />
      </Page>

      {/* Page 2 */}
      <Page size="A4" style={styles.page}>
        <Image src="/image/002.png" style={styles.image} />
      </Page>
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
            <Image src="/image/004.png" style={styles.image} />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>WebVulnerabilities Table</Text>
          {WebVulnerabilityData.info && (
            <WebVulnerabilities WebVulnerabilityData={WebVulnerabilityData.info}/>
          )}
        </View>
      </Page>



      {/* Page 4 */}
      <Page size="A4" style={styles.page}>
            <Image src="/image/003.png" style={styles.image} />
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Include the AnomalyDetection component here */}
          {anomalyData.info && (
            <AnomalyDetection anomalyData={anomalyData.info} selectedRiskLevels={selectedRiskLevels} />
          )}
        </View>
      </Page>

    </Document>
  );
}

export default ReportPDF;
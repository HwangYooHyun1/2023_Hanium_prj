import React, { useState, useEffect } from 'react';
import MetricsInfo from './MetricsInfo';
import DateRangeModal from './DateRangeModal';
import axios from 'axios';
import ReportPDF from './ReportPDF';
import BarChartComponent from './BarChartComponent';
import NetworkPieChart from "./NetworkPieChart";
import GroupedBarChart from "./GroupedBarChart";
import Styled from "styled-components";

const Title = Styled.div`
  display: fixed;
  padding-top: 60px;
`;

const GenerateReportButton = Styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const DownloadReportButton = Styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReportContent = Styled.div`
  display: flex;
  flex-direction: row; /* Change to row to align elements side by side */
  justify-content: space-between;
`;

const ReportText = Styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LeftContent = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; /* Arrange charts vertically */
  padding: 20px;
`;

const RightImage = Styled.img`
  max-width: 100%;
  width: 1000px;
  height: auto;
  overflow: auto;
`;



const ChartContainer = Styled.div`
  width: 100%; /* Set the desired width here */
  margin-bottom: 20px; /* Add some margin between charts */
`;

const StyledHeader = Styled.h2`
  font-size: 28px;
  color: #333; /* Set your desired text color */
  margin-bottom: 10px;
`;

const StyledText = Styled.p`
  font-size: 18px;
  color: #666; /* Set your desired text color */
`;

function Report() {
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState({});
  const [anomalyData, setAnamolalyData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [startData, setStartData] = useState({});
  const [endData, setEndData] = useState({});

  const [selectedRiskLevels, setSelectedRiskLevels] = useState([]);

  const handleRiskLevelChange = (newSelectedRiskLevels) => {
    setSelectedRiskLevels(newSelectedRiskLevels);
  };

  const [WebVulnerabilityData, setWebVulnerabilityData] = useState({});

  const [chartImage, setChartImage] = useState(null);
  const handleChartImageGenerated = (imageURL) => {
    console.log('서버 이미지 생성 확인 로그', imageURL);
    // 이미지 생성이 완료되었음을 알리는 콜백 함수
    setChartImage(imageURL);
    
  };

  const handleGenerateReport = () => {
    setModalOpen(true);
  };

  const handleSubmitDateRange = async (startDate, endDate) => {
    try {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      console.log('전송 데이터 출력', formattedStartDate, formattedEndDate);


      const webVulnerabilityDataResponse = await axios.post("http://52.79.201.187:8080/vulnerabilities", {
        
          "url" : '43.201.100.180'
        
      });


      const anomalyResponse = await axios.get("http://52.79.201.187:8080/reports", {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        }
      });

      console.log('받은 데이터-이상탐지 :', anomalyResponse.data);


      const response = await axios.get(
        "http://52.79.201.187:8080/getmetrics",
        { params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        } }
      );

      

  
      setReportData(response.data);
      setAnamolalyData(anomalyResponse.data);
      setWebVulnerabilityData(webVulnerabilityDataResponse.data);
  
      setStartData(formattedStartDate);
      setEndData(formattedEndDate);

      console.log('받은 데이터-서버:', reportData);
      console.log('받은 데이터-이상탐지:', anomalyData);
      console.log('받은 데이터-취약점:', WebVulnerabilityData);
      console.log('받은 데이터-취약점.info', WebVulnerabilityData.info);
  
      setReportGenerated(true);
      setModalOpen(false);
    } catch (error) {
      console.error('보고서 생성 중 에러:', error);
    }
  };
  
  
  

  useEffect(() => {
    if ( chartImage) {
      generatePDF();
    }
  }, [ chartImage, reportData.info, anomalyData.info, selectedRiskLevels,WebVulnerabilityData.info]);

  const generatePDF = () => {
    if (reportGenerated && reportData.info && anomalyData.info  && chartImage && WebVulnerabilityData.info) {
      // PDF 생성 로직 실행
      const pdfContent = (
        <ReportPDF
          reportData={reportData}
          anomalyData={anomalyData}
          chartImage={chartImage}
          selectedRiskLevels={selectedRiskLevels}
          WebVulnerabilityData={WebVulnerabilityData}
        />
      );
  
      // pdfMake 또는 다른 PDF 생성 라이브러리를 사용하여 PDF를 생성하는 로직
      // ...
    }
  };
  
  return (
    <div>
      <Title>
        <h5>Report</h5>
      </Title>

        <GenerateReportButton onClick={handleGenerateReport}>
        보고서 생성
      </GenerateReportButton>
      
      
      {/* PDF 다운로드 버튼 */}
      <ReportPDF
        reportData={reportData}
        anomalyData={anomalyData}
        startDate={startData}
        endDate={endData}
        selectedRiskLevels={selectedRiskLevels}
        chartImage={chartImage}
        WebVulnerabilityData={WebVulnerabilityData}
      />
      <ReportContent>
      <LeftContent>
  {reportGenerated ? (
    <div>
      <StyledText>보고서 생성 완료</StyledText>

      {/* Metric Info */}
      <ChartContainer>
        <StyledHeader>Metric Info</StyledHeader>
        <GroupedBarChart data={reportData.info} onImageGenerated={handleChartImageGenerated}/>
      </ChartContainer>

      {/* BarChartComponent */}
      <ChartContainer>
        <StyledHeader>Anomaly Detection Risk Level</StyledHeader>
        <BarChartComponent anomalyChartData={anomalyData.info}  />
      </ChartContainer>
      
      {/* Network Data Info */}
      <ChartContainer>
        <StyledHeader>Network Data Info</StyledHeader>
        <NetworkPieChart networkData={reportData.info} />
      </ChartContainer>
    </div>
  ) : (
    <StyledText>보고서 데이터 로딩 중...</StyledText>
  )}
  <DateRangeModal
    isOpen={modalOpen}
    onClose={() => setModalOpen(false)}
    onSubmit={handleSubmitDateRange}
    selectedRiskLevels={selectedRiskLevels}
    onRiskLevelChange={handleRiskLevelChange}
  />
</LeftContent>

  {/* Right Image */}
</ReportContent>
    </div>
  );
}

export default Report;
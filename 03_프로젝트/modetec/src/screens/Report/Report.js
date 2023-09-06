import React, { useState, useEffect } from 'react';
import MetricsInfo from './MetricsInfo';
import DateRangeModal from './DateRangeModal';
import axios from 'axios';
import ReportPDF from './ReportPDF';
import BarChartComponent from './BarChartComponent';
import NetworkPieChart from "./NetworkPieChart";
import GroupedBarChart from "./GroupedBarChart";

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

  const [webVulnerabilityData, setWebVulnerabilityData] = useState({});

  const [chartImage, setChartImage] = useState(null);
  const handleChartImageGenerated = (imageURL) => {
    console.log('차트1 이미지 생성 확인 로그', imageURL);
    // 이미지 생성이 완료되었음을 알리는 콜백 함수
    setChartImage(imageURL);
    
  };

 

  const [chartImageURL, setChartImageURL] = React.useState(null);
  const handleImageGenerated = (imageURL) => {
    console.log('차트2 이미지 생성 확인 로그', imageURL);
    setChartImageURL(imageURL);
    // generatePDF 함수는 이미지가 생성된 경우에만 호출되도록 수정

  };

  const [pieChartImage, setPieChartImage] = useState(null);
  const handlePieChartImageGenerated = (imageURL) => {
    console.log('차트3 이미지 생성 확인 로그', imageURL);
    setPieChartImage(imageURL);
  }
 

  const handleGenerateReport = () => {
    setModalOpen(true);
  };

  const handleSubmitDateRange = async (startDate, endDate) => {
    try {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      const response = await axios.get(
        "http://52.79.201.187:8080/getmetrics",
        { params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        } }
      );

       const anomalyResponse = await axios.get("http://52.79.201.187:8080/reports", {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate
        }
      });

     
      console.log('받은 데이터-서버:', response.data);
      console.log('받은 데이터-이상탐지 :', anomalyResponse.data);

      

      setReportData(response.data);
      setAnamolalyData(anomalyResponse.data);


      setStartData(formattedStartDate);
      setEndData(formattedEndDate);



      setReportGenerated(true);
      setModalOpen(false);
    } catch (error) {
      console.error('보고서 생성 중 에러:', error);
    }
  };

  
  
  return (
    <div style={{ marginTop: '150px' }}>
      <button onClick={handleGenerateReport}>보고서 생성</button>
      
      {/* 기존의 ReportPDF 컴포넌트 부분 */}
    


      {reportGenerated ? (
        <div>
          <h1>* modetec 보고서</h1>
          <h1>보고서 생성 완료</h1>
          
          {/* BarChartComponent를 렌더링하고 콜백 함수를 전달합니다. */}
          <BarChartComponent anomalyChartData={anomalyData.info} onImageGenerated={handleChartImageGenerated} />
          {/* 생성된 이미지 URL을 사용하여 이미지를 렌더링합니다. */}

          <h2>Grouped Bar Chart</h2>
          <GroupedBarChart data={reportData.info} onImageGenerated={handleImageGenerated} />
          
              
          <h2>Network Data Pie Chart</h2>
          <NetworkPieChart networkData={reportData.info} onImageGenerated={handlePieChartImageGenerated}/>
          {pieChartImage && <img src={pieChartImage} alt="파이차트생성"/>}
        </div>
      ) : (
        <p>보고서 데이터 로딩 중...</p>
      )}
      <DateRangeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitDateRange}
        selectedRiskLevels={selectedRiskLevels}
        onRiskLevelChange={handleRiskLevelChange}
      />
    </div>
    
  );
}

export default Report;

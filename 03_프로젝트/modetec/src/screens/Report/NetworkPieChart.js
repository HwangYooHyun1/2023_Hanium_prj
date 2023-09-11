import React, { useRef, useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const NetworkPieChart = ({ networkData, onImageGenerated }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  console.log('차트3데이터전달', networkData);

  useEffect(() => {
    if (networkData) {
      // 필요한 데이터만 추출하여 사용
      const filteredData = {
        avg_net_in: networkData.avgNetIn,
        avg_net_out: networkData.avgNetOut,
      };

      const labels = Object.keys(filteredData);
      const data = Object.values(filteredData).map(value => parseFloat(value));

      const pieChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#FF6384', // Red
              '#36A2EB', // Blue
              // Add more colors as needed
            ],
          },
        ],
      };

      setChartData(pieChartData);
    }
  }, [networkData]);

  const saveImageLocally = async () => {
    if (chartRef.current && chartData) {
      try {
        const canvas = await html2canvas(chartRef.current.chartInstance.canvas);
        const imageURL = canvas.toDataURL("image/png");
  
        console.log('차트 3 이미지 생성 완료:', imageURL);
  
        // 이미지 생성이 완료되었음을 콜백 함수로 알립니다.
        onImageGenerated(imageURL);
      } catch (error) {
        console.error('Error converting chart to image:', error);
      }
    }
  };
  

  useEffect(() => {
    if (chartData) {
      // 이미지를 생성하고 콜백 함수를 통해 전달합니다.
      saveImageLocally();
    }
  }, [chartData]);

  return (
    <div>
      {chartData && (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          ref={chartRef}
        />
      )}
    </div>
  );
};

export default NetworkPieChart;
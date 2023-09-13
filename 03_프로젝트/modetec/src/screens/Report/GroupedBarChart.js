import React, { useRef, useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const GroupedBarChart = ({ data, onImageGenerated }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    if (data) {
      // 필요한 필드들을 추출하여 사용
      const avgCPU = parseFloat(data.avgCpu);
      const avgMem = parseFloat(data.avgMem);
      const maxCPU = parseFloat(data.maxCpu);
      const maxMem = parseFloat(data.maxMem);

      const labels = ["CPU", "Memory"];
      const group1Values = [avgCPU, avgMem];
      const group2Values = [maxCPU, maxMem];

      const barChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Avg',
            data: group1Values,
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Green
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: 30,
          },
          {
            label: 'Max',
            data: group2Values,
            backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barThickness: 30,
          },
        ],
      };

      setChartData(barChartData);
    }
  }, [data]);

  const saveImageLocally = async () => {
    if (chartRef.current && chartData) {
      try {
        // html2canvas 함수를 Promise로 래핑합니다.
        const canvas = await new Promise((resolve) => {
          html2canvas(chartRef.current, {
            // DPI 설정을 통해 이미지 화질을 개선합니다.
            dpi: 300, // 300 DPI로 설정 (원하는 DPI로 조정 가능)
          }).then((canvas) => {
            resolve(canvas);
          });
        });
  
        // 이미지 데이터 URL 생성
        const imageURL = canvas.toDataURL("image/png");
  
        // 이미지 생성 완료 로그 출력
        console.log('차트 이미지 생성 완료');
  
        // 이미지 생성이 완료되었음을 콜백 함수로 알립니다.
        onImageGenerated(imageURL);
      } catch (error) {
        console.error('차트 이미지 생성 중 오류 발생:', error);
      }
    }
  };
  
  

  useEffect(() => {
    if (chartData) {
      // 이미지를 생성하고 콜백 함수를 통해 전달합니다.
      saveImageLocally();
    }
  }, [chartData]);

  // 컴포넌트 반환
  return (
    <div>
      {chartData && (
        <div ref={chartRef}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 3,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
        </div>
      )}
    </div>
  );
};

export default GroupedBarChart;

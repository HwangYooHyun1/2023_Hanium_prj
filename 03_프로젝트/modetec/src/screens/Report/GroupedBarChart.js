import React, { useRef, useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const GroupedBarChart = ({ data, onImageGenerated }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  console.log('그룹바차트 컴포넌트 실행여부');

  useEffect(() => {
    if (data) {
      // 필요한 필드들을 추출하여 사용
      const avgCPU = parseFloat(data.avg_cpu);
      const avgMem = parseFloat(data.avg_mem);
      const maxCPU = parseFloat(data.max_cpu);
      const maxMem = parseFloat(data.max_mem);

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
        const canvas = await html2canvas(chartRef.current);
        const imageURL = canvas.toDataURL("image/png");

        console.log('차트 2 이미지 생성 완료');

        // 이미지 생성이 완료되었음을 콜백 함수로 알립니다.
        onImageGenerated(imageURL);
      } catch (error) {
        console.error('Error converting chart to image:', error);
      }
    }
  };

  useEffect(() => {
    if ( chartData) {
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

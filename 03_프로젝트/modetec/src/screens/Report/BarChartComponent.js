import React, { useRef, useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

function BarChartComponent({ anomalyChartData, onImageGenerated }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (anomalyChartData && Array.isArray(anomalyChartData)) {
      const riskLevelCounts = {
        Minimal: 0,
        Low: 0,
        Medium: 0,
        High: 0,
      };

      anomalyChartData.forEach(data => {
        if (data.score !== undefined) {
          const score = data.score;
          const riskLevel = score >= 75 ? "High" : score >= 50 ? "Medium" : score >= 25 ? "Low" : "Minimal";
          riskLevelCounts[riskLevel]++;
        }
      });

      const newData = {
        labels: ['Minimal', 'Low', 'Medium', 'High'],
        datasets: [
          {
            label: '',
            data: [
              riskLevelCounts.Minimal, riskLevelCounts.Low, riskLevelCounts.Medium, riskLevelCounts.High
            ],
            backgroundColor: [
              'rgba(139, 200, 251, 0.2)',
              'rgba(253, 221, 0, 0.2)',
              'rgba(251, 167, 64, 0.2)',
              'rgba(254, 80, 80, 0.2)',
            ],
            borderColor: [
              'rgba(139, 200, 251, 1)',
              'rgba(253, 221, 0, 1)',
              'rgba(251, 167, 64, 1)',
              'rgba(254, 80, 80, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      setChartData(newData);
    }
  }, [anomalyChartData]);
  const saveImageLocally = async () => {
    if (chartRef.current && chartData) {
      try {
        const canvas = await html2canvas(chartRef.current);
        const imageURL = canvas.toDataURL("image/png");

        // 이미지 생성 완료 로그 출력
        console.log('차트1 이미지 생성 완료');

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
    <div className="Report">
      <div>

        {chartData && (
          <div ref={chartRef}>
            <Bar data={chartData} options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Risk Levels'
                  }
                }
              }
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default BarChartComponent;
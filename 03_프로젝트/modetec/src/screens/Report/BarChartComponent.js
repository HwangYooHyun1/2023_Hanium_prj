import React, { useRef, useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

function BarChartComponent({ anomalyChartData}) {
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

      const labels = ['Minimal', 'Low', 'Medium', 'High'];
      const newData = {
        labels: labels,
        datasets: [
          {
            label: 'Risk Levels', // 수정된 부분
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
  
  

  return (
    <div className="Report">
      <div>

        {chartData && (
            <Bar data={chartData} options={{
              scales: {
                x: {
                  title: {
                    display: true,
                    text: ''
                  }
                }
              }
            }} />
        )}
      </div>
    </div>
  );
}

export default BarChartComponent;
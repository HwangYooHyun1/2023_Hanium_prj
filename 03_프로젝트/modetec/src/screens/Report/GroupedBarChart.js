import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const GroupedBarChart = ({ data }) => {
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

  // 컴포넌트 반환
  return (
    <div>
      {chartData && (
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
      )}
    </div>
  );
};

export default GroupedBarChart;

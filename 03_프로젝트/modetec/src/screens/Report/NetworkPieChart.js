import React, { useRef, useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const NetworkPieChart = ({ networkData }) => {
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





  return (
    <div>
      {chartData && (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      )}
    </div>
  );
};

export default NetworkPieChart;
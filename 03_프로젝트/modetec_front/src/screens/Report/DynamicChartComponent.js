// DynamicChartComponent.js
import React, { useRef, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { Chart, CategoryScale } from 'chart.js/auto';
Chart.register(CategoryScale);

const DynamicChartComponent = ({ label, value, max, onImageGenerated }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    saveImageLocally(label);
  }, [label, value, max]);

  const saveImageLocally = async (label) => {
    if (chartRef.current) {
      const chartData = {
        labels: [label],
        datasets: [
          {
            data: [value, max - value],
            backgroundColor: ['#36A2EB', '#E0E0E0'],
            hoverBackgroundColor: ['#36A2EB', '#E0E0E0'],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        animation: {
          animateRotate: false,
          animateScale: true,
        },
      };

      // Destroy previous Chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new Chart instance
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: options,
      });

      // Save the chart instance reference
      chartInstanceRef.current = chart;

      try {
        const canvas = await html2canvas(chartRef.current);
        const imageURL = canvas.toDataURL("image/png");

        // Destroy the chart instance after image is generated
        chartInstanceRef.current.destroy();

        onImageGenerated(label, imageURL);
      } catch (error) {
        console.error('Error converting chart to image for', label, ':', error);
      }
    }
  };

  return (
    <div>
      <canvas ref={chartRef} width={400} height={400} />
    </div>
  );
};

export default DynamicChartComponent;

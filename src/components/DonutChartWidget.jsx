// src/components/DonutChartWidget.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartWidget = ({ data, labels, title }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#ef4444', '#facc15', '#9ca3af', '#10b981'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{title}</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DonutChartWidget;

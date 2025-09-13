import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ChartWidget = ({ widget }) => {
  const { id, name, content } = widget;

  // Parse content into structured data
  const lines = content.split('\n');
  const dataMap = {};
  lines.forEach(line => {
    const match = line.match(/(.*?):?\s*\(?(\d+)\)?/);
    if (match) {
      const label = match[1].trim();
      const value = parseInt(match[2]);
      dataMap[label] = value;
    }
  });

  const labels = Object.keys(dataMap);
  const values = Object.values(dataMap);

  const isDonut = id.includes('risk') || id.includes('assessment');
  const chartData = {
    labels,
    datasets: [
      {
        label: name,
        data: values,
        backgroundColor: ['#ef4444', '#facc15', '#9ca3af', '#10b981', '#3b82f6'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{name}</h3>
      {isDonut ? <Doughnut data={chartData} /> : <Bar data={chartData} />}
    </div>
  );
};

export default ChartWidget;

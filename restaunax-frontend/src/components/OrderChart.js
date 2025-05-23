import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderChart = ({ orders = [] }) => {
  // Ensure orders is an array
  const validOrders = Array.isArray(orders) ? orders : [];

  const statusCounts = validOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: ['Pending', 'Preparing', 'Ready', 'Delivered'],
    datasets: [
      {
        label: 'Orders by Status',
        data: [
          statusCounts.pending || 0,
          statusCounts.preparing || 0,
          statusCounts.ready || 0,
          statusCounts.delivered || 0,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: { title: { display: true, text: 'Order Status Distribution' } },
      }}
    />
  );
};

export default OrderChart;
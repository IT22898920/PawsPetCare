import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getProducts } from '../../redux/features/product/productSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartType }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const prepareChartData = () => {
    if (chartType === "productsPerCategory") {
      const productCountsByCategory = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      return {
        labels: Object.keys(productCountsByCategory),
        datasets: [{
          label: 'Number of Products',
          data: Object.values(productCountsByCategory),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }]
      };
    } else if (chartType === "productQuantities") {
      return {
        labels: products.map(product => `${product.name} (${product.category})`),
        datasets: [{
          label: 'Quantity',
          data: products.map(product => Number(product.quantity)),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      };
    }
  };

  const chartData = prepareChartData();

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: chartType === "productsPerCategory" ? 'Product Counts by Category' : 'Product Quantities by Name and Category',
        font: {
          size: 18,
        },
        color: '#444',
      },
      tooltip: {
        backgroundColor: '#000',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        cornerRadius: 4,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;

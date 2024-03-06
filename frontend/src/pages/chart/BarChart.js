import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getProducts } from '../../redux/features/product/productSlice';
import 'chartjs-plugin-zoom';
import { FiZoomIn } from "react-icons/fi"; // Import Zoom In icon
import { MdOutlineZoomOut } from "react-icons/md"; // Import Zoom Out icon

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartType }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const chartRef = useRef(null);
  const [chartContainerSize, setChartContainerSize] = useState({ width: '100%', height: '400px' });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const prepareChartData = () => {
    if (chartType === 'productsPerCategory') {
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
    } else if (chartType === 'productQuantities') {
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
        text: chartType === 'productsPerCategory' ? 'Product Counts by Category' : 'Product Quantities by Name and Category',
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
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
  };

  const increaseSize = () => {
    setChartContainerSize(prevSize => ({
      ...prevSize,
      height: `${parseInt(prevSize.height) + 100}px` // Increase height by 100px
    }));
  };
  
  const decreaseSize = () => {
    setChartContainerSize(prevSize => ({
      ...prevSize,
      height: `${Math.max(parseInt(prevSize.height) - 100, 100)}px` // Decrease height by 100px, min 100px
    }));
  };

  const downloadChartAsImage = (imageFormat) => {
    const chart = chartRef.current;
    if (!chart) return;

    const imageUrl = chart.toBase64Image(`image/${imageFormat}`, 1.0);
    const link = document.createElement('a');
    link.download = `${chartType}-chart.${imageFormat}`;
    link.href = imageUrl;
    link.click();
  };
  const downloadCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    if (chartType === 'productsPerCategory') {
      // Header
      csvContent += "Category,Number of Products\n";
  
      // Aggregate product counts by category
      const productCountsByCategory = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});
  
      // Data rows
      for (const [category, count] of Object.entries(productCountsByCategory)) {
        csvContent += `${category},${count}\n`;
      }
    } else if (chartType === 'productQuantities') {
      // Header
      csvContent += "Product Name,Category,Quantity\n";
  
      // Data rows
      products.forEach(product => {
        csvContent += `${product.name},${product.category},${product.quantity}\n`;
      });
    }
  
    // Encode and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${chartType}-chart_data.csv`);
    link.click();
  };

  return (
    <>
      <div className="button-container">
        <button className="download-png-button" onClick={() => downloadChartAsImage('png')}>Download PNG</button>
        <button className="download-jpeg-button" onClick={() => downloadChartAsImage('jpeg')}>Download JPEG</button>
        <button className="download-csv-button" onClick={downloadCSV}>Download CSV</button>
        <button className="icon-button" onClick={increaseSize}><FiZoomIn /></button> {/* Use FiZoomIn icon */}
        <button className="icon-button" onClick={decreaseSize}><MdOutlineZoomOut /></button> {/* Use MdOutlineZoomOut icon */}
      </div>
      <div style={chartContainerSize}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </>
  );
};

export default BarChart;

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getProducts } from '../../../redux/features/product/productSlice';
import 'chartjs-plugin-zoom';
import { FiZoomIn } from "react-icons/fi"; // Ensure you have react-icons installed
import { MdOutlineZoomOut } from "react-icons/md"; // Ensure you have react-icons installed

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalStoreValueBarchart = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartSize, setChartSize] = useState({ width: 700, height: 700 });

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length) {
      const dataset = products.map(product => {
        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity, 10);
        return !isNaN(price) && !isNaN(quantity) ? price * quantity : 0;
      });

      setChartData({
        labels: products.map(product => product.name),
        datasets: [{
          data: dataset,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A',
            '#949FB1', '#4D5360', '#AC64AD', '#FF9F40', '#FFCD56',
            '#4D5360', '#23C9FF', '#C9CB3F', '#FF6384', '#36A2EB',
            '#FFCE56', '#4BC0C0', '#F7464A', '#949FB1', '#4D5360',
            '#AC64AD', '#FF9F40', '#FFCD56', '#4D5360', '#23C9FF',
            '#C9CB3F'
          ],
          hoverOffset: 4
        }],
      });
    }
  }, [products]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Store Value by Product',
        font: {
          size: 24,
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let label = tooltipItem.label || '';
            if (label) {
              label += ': ';
            }
            label += `LKR ${tooltipItem.parsed.toFixed(2)}`;
            const total = tooltipItem.chart._metasets[tooltipItem.datasetIndex].total;
            const percentage = ((tooltipItem.parsed / total) * 100).toFixed(2) + '%';
            label += ` (${percentage})`;
            return label;
          }
        }
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
  };

  const downloadChartAsImage = (imageFormat) => {
    const chart = chartRef.current;
    if (chart) {
      // Accessing the canvas directly to generate the image URL
      const url = chart.toBase64Image(); // This captures the current state of the canvas
      const link = document.createElement('a');
      link.download = `TotalStoreValue-${new Date().toISOString()}.${imageFormat}`;
      link.href = url;
      document.body.appendChild(link); // Append link to body to make it work on Firefox
      link.click();
      document.body.removeChild(link); // Clean up
    } else {
      console.error('Chart reference not found');
    }
  };
  const zoomIn = () => {
    setChartSize({ width: chartSize.width * 1.1, height: chartSize.height * 1.1 });
  };

  const zoomOut = () => {
    setChartSize({ width: chartSize.width / 1.1, height: chartSize.height / 1.1 });
  };
  const downloadCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += "Product Name,Price,Quantity,Total Value\n";
    products.forEach(product => {
      const totalValue = parseFloat(product.price) * parseInt(product.quantity, 10);
      csvContent += `${product.name},${product.price},${product.quantity},${totalValue}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', "total_store_value.csv");
    link.click();
  };

  

  return (
    <>
      <div className="button-container">
      <button onClick={() => downloadChartAsImage('png')} className="icon-button">Download PNG</button>
      <button onClick={() => downloadChartAsImage('jpeg')} className="icon-button">Download JPEG</button>
      <button onClick={downloadCSV} className="download-csv-button">Download CSV</button>
      <button onClick={zoomIn} className="icon-button"><FiZoomIn /></button>
        <button onClick={zoomOut} className="icon-button"><MdOutlineZoomOut /></button>
      </div>
      <div className='ravindu.piechart' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: `${chartSize.width}px`, height: `${chartSize.height}px` }}>
          <Pie ref={chartRef} data={chartData} options={options} />
        </div>
      </div>
    </>
  );
};

export default TotalStoreValueBarchart;

import React from 'react';
import BarChart from "./BarChart";
import './BarChart.css'; // Ensure the CSS file is imported

const Chart = () => {
  return (
    <div className="chart-container">
      <div className="chart">
        <h2 className="chart-title">Products Per Category</h2>
        <BarChart chartType="productsPerCategory" />
      </div>
      <div className="chart">
        <h2 className="chart-title">Product Quantities</h2>
        <BarChart chartType="productQuantities" />
      </div>
    </div>
  );
}

export default Chart;

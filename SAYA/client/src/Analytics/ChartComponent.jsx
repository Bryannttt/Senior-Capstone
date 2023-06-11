// src/components/ChartComponent.jsx
import React, { useEffect, useState } from 'react';
import SayaData from '../Analytics/raw_data.csv';
import './Analytics.css';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    Papa.parse(SayaData, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: '',
      complete: (result) => {
        console.log(result);
        setChartData({
          //to select different fields to generate the chart, change the following. "item.whateverField"
          // the field names appear under the object when you inspect "object" under console. Keep clicking the carrots until you see the field names
          //the "labels" in the following line will control the x-axis of the chart
          labels: result.data.map((item, index) => item.meter_local_time),
          datasets: [
            {
              // You can change the label, which is the header of the chart and color of the bar graph here
              label: "FLOW RATE",
              // the data field "data" underneath is the y-axis of the chart
              data: result.data.map((item, index) => item.flow),
              borderColor: "black",
              backgroundColor: "red",
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              // The text underneath will appear above the label
              text: "FLOW",
            },
          },
        });
      },
    });
  }, []);

  return (
    <>
      {chartData.datasets.length > 0 ? (
        <div className="barChart">
        <h1>SAYA Analytics</h1>
          <Bar options={chartOptions} data={chartData} />
        </div>
      ) : (
        <div>Loading.....</div>
      )}
    </>
  );
};

export default ChartComponent;

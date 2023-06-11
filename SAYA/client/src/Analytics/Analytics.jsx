// src/Analytics/Analytics.jsx
import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ChartComponent from './ChartComponent';

function Analytics() {
  return (
    <div>
      <Sidebar />
      <div className='analyticsChart'>
      <ChartComponent />
      </div>
    </div>
  );
}

export default Analytics;

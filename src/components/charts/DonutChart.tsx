'use client';
import dynamic from 'next/dynamic';

// Import Chart component from react-apexcharts dynamically
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DonutChart = (props) => {
  const { chartData, chartOptions } = props;

  return (
    <Chart
      options={chartOptions}
      type="donut" // Corrected chart type
      width="100%"
      height="100%"
      series={chartData}
    />
  );
};

export default DonutChart;

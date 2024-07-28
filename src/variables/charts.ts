export const barChartDataDailyTraffic = [
  {
    name: 'Daily Traffic',
    data: [20, 30, 40, 20, 45, 50, 30],
  },
];

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
    theme: 'dark',
  },
  xaxis: {
    categories: ['00', '04', '08', '12', '14', '16', '18'],
    show: false,
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: 'black',
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px',
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: '#4318FF',
            opacity: 1,
          },
          {
            offset: 100,
            color: 'rgba(67, 24, 255, 1)',
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '40px',
    },
  },
};

//
export const adminDataChart = [
  {
    name: 'Admin Data',
    data: [25, 30, 4],
  },
];

export const adminDataChartOptions = {
  chart: {
    type: 'bar', // Ensure the chart type is 'bar'
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
    theme: 'dark',
  },
  xaxis: {
    show: true, // Set to true to show the x-axis
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    categories: ['Omerald', 'Diagnostic', 'Admin'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true, // Set to true to show the y-axis
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px',
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'solid', // Change to 'solid' for solid colors
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '40px',
      colors: {
        ranges: [
          {
            from: 0,
            to: 20,
            color: '#910a00', // Color for the first bar
          },
          {
            from: 21,
            to: 100,
            color: '#4044ff', // Color for the second bar
          },
          {
            from: 100,
            to: 1000,
            color: '#004512', // Color for the third bar
          },
        ],
      },
    },
  },
  colors: ['#FF5733', '#33FF57', '#3357FF'], // Overall series colors if applicable
};

export const pieChartOptions = {
  labels: ['Your files', 'System', 'Empty'],
  colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  chart: {
    width: '50px',
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
  },
};

export const pieChartData = [63, 25, 12];

export const adminDonoughtOptions = {
  labels: ['Admin', 'Diagnostic Center', 'User'],
  colors: ['#4044ff', '#de1fb8', '#e89b17'],
  chart: {
    width: '100px',
    innerHeight: '150px',
    outerHeight: '150px',
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  legend: {
    show: true,
    position: 'bottom', // Position the legend at the bottom
    horizontalAlign: 'right', // Align legend items to the right
    floating: false, // If true, the legend will be positioned absolutely
    offsetY: 0, // Vertical offset of the legend
    offsetX: 0, // Horizontal offset of the legend
    labels: {
      colors: '#A3AED0', // Color of the legend labels
    },
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ['#4044ff', '#de1fb8', '#e89b17'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
  },
};

export const adminDonoughtChartData = [63, 25, 12];

// export const barChartDataWeeklyRevenue = [
//   {
//     name: 'PRODUCT A',
//     data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
//     color: '#6AD2Fa',
//   },
//   {
//     name: 'PRODUCT B',
//     data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
//     color: '#4318FF',
//   },
//   {
//     name: 'PRODUCT C',
//     data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
//     color: '#EFF4FB',
//   },
// ];

// export const barChartOptionsWeeklyRevenue = {
//   chart: {
//     stacked: true,
//     toolbar: {
//       show: false,
//     },
//   },
//   // colors:['#ff3322','#faf']
//   tooltip: {
//     style: {
//       fontSize: '12px',
//       fontFamily: undefined,
//       backgroundColor: '#000000',
//     },
//     theme: 'dark',
//     onDatasetHover: {
//       style: {
//         fontSize: '12px',
//         fontFamily: undefined,
//       },
//     },
//   },
//   xaxis: {
//     categories: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
//     show: false,
//     labels: {
//       show: true,
//       style: {
//         colors: '#A3AED0',
//         fontSize: '14px',
//         fontWeight: '500',
//       },
//     },
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//   },
//   yaxis: {
//     show: false,
//     color: 'black',
//     labels: {
//       show: false,
//       style: {
//         colors: '#A3AED0',
//         fontSize: '14px',
//         fontWeight: '500',
//       },
//     },
//   },

//   grid: {
//     borderColor: 'rgba(163, 174, 208, 0.3)',
//     show: true,
//     yaxis: {
//       lines: {
//         show: false,
//         opacity: 0.5,
//       },
//     },
//     row: {
//       opacity: 0.5,
//     },
//     xaxis: {
//       lines: {
//         show: false,
//       },
//     },
//   },
//   fill: {
//     type: 'solid',
//     colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
//   },
//   legend: {
//     show: false,
//   },
//   colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
//   dataLabels: {
//     enabled: false,
//   },
//   plotOptions: {
//     bar: {
//       borderRadius: 10,
//       columnWidth: '20px',
//     },
//   },
// };

export const lineChartDataTotalSpent = [
  {
    name: 'Revenue',
    data: [50, 64, 48, 66, 49, 68],
    color: '#4318FF',
  },
  {
    name: 'Profit',
    data: [30, 40, 24, 46, 20, 46],
    color: '#6AD2FF',
  },
];

export const lineChartOptionsTotalSpent = {
  legend: {
    show: false,
  },

  theme: {
    mode: 'light',
  },
  chart: {
    type: 'line',

    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    theme: 'dark',
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
        fontWeight: '500',
      },
    },
    type: 'text',
    range: undefined,
    categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
  },
  yaxis: {
    show: false,
  },
};

//

export const lineChartDataUserGrowth = [
  {
    name: 'Omerald User',
    data: [1, 1],
    color: '#6AD2FF',
  },
];

export const lineChartOptionsUserGrowth = {
  legend: {
    show: true,
    position: 'bottom', // Position the legend at the bottom
    horizontalAlign: 'right', // Align legend items to the right
    floating: false, // If true, the legend will be positioned absolutely
    offsetY: 0, // Vertical offset of the legend
    offsetX: 0, // Horizontal offset of the legend
    labels: {
      colors: '#A3AED0', // Color of the legend labels
    },
  },

  theme: {
    mode: 'light',
  },
  chart: {
    type: 'line',

    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    theme: 'dark',
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
        fontWeight: '500',
      },
    },
    type: 'text',
    range: undefined,
    categories: ['Apr 2023', 'Feb 2024'],
  },
  yaxis: {
    show: true,
  },
};

//

export const barChartDataWeeklyRevenue = [
  {
    name: 'Admin Assets',
    data: [2, 1, 2, 4, 4, 1, 2],
    color: '#3b3bf7',
  },
];

export const barChartOptionsWeeklyRevenue = {
  legend: {
    show: false,
  },

  theme: {
    mode: 'light',
  },
  chart: {
    type: 'line',
    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    theme: 'dark',
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#A3AED0',
        fontSize: '12px',
        fontWeight: '500',
      },
    },
    type: 'text',
    range: undefined,
    categories: [
      'Vaccine',
      'Dose',
      'Dose Duration',
      'Report',
      'Parameter',
      'Sample',
      'Diagnosed Condition',
    ],
  },
  yaxis: {
    show: false,
  },
};

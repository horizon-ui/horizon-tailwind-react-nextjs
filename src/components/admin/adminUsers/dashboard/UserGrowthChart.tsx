import { MdOutlineCalendarToday, MdBarChart } from 'react-icons/md';
import Card from '@component/card';
import {
  lineChartDataUserGrowth,
  lineChartOptionsUserGrowth,
} from '@variables/charts';
import LineChart from '@component/charts/LineChart';
import { OmeraldUser } from '@src/api/utils/interface';

// Define the type for props
interface UserGrowthChartProps {
  userData: OmeraldUser[];
}

const UserGrowthChart = ({ userData }: any) => {
  // Early return if no userData
  if (!userData || userData.length === 0) {
    return <p>No data available</p>;
  }

  // Extract categories and data safely
  const categoryList = userData.map((user) => user.month || 'Unknown');
  const categoryData = userData.map((user) => user.count || 0);

  // Update chart options with the categories
  const lineChartOptionsUserGrowthOptions = {
    ...lineChartOptionsUserGrowth,
    xaxis: {
      ...lineChartOptionsUserGrowth.xaxis,
      categories: categoryList,
    },
  };

  // Update chart data
  const lineChartDataUserGrowthData = lineChartDataUserGrowth.map(
    (dataSet) => ({
      ...dataSet,
      data: dataSet.name === 'omeraldUser' ? categoryData : dataSet.data,
    }),
  );

  return (
    <Card extra="!p-[20px] text-center">
      <div className="mb-4 flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">
            User Growth - Monthly
          </span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <LineChart
            chartOptions={lineChartOptionsUserGrowthOptions}
            chartData={lineChartDataUserGrowthData}
          />
        </div>
      </div>
    </Card>
  );
};

export default UserGrowthChart;

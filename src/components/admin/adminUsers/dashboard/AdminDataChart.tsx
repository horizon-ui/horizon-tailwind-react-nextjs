import BarChart from '@component/charts/BarChart';
import { adminDataChart, adminDataChartOptions } from '@variables/charts';
import Card from '@component/card';

const AdminDataChart = () => {
  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-sm font-bold leading-4 text-gray-600">
            Admin Data
          </p>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            <span className="text-sm font-medium leading-6 text-gray-600">
              {/* Visitors */}
            </span>
          </p>
        </div>
        {/* <div className="mt-2 flex items-start">
          <div className="flex items-center text-sm text-green-500">
            <MdArrowDropUp className="h-5 w-5" />
            <p className="font-bold"> +2.45% </p>
          </div>
        </div> */}
      </div>

      <div className="h-[300px] w-full pb-0 pt-10">
        <BarChart
          chartData={adminDataChart}
          chartOptions={adminDataChartOptions}
        />
      </div>
    </Card>
  );
};

export default AdminDataChart;

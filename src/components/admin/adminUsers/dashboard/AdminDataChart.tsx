import BarChart from '@component/charts/BarChart';
import { adminDataChart, adminDataChartOptions } from '@variables/charts';
import Card from '@component/card';
import { useEffect, useState } from 'react';

interface UserCount {
  userCount: {
    omeraldUsers: number;
    adminUsers: number;
    diagUsers: number;
  };
}

const AdminDataChart = ({ userCount }) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (userCount && userCount?.omeraldUsers) {
      const adminDataChart = [
        {
          name: 'Users/Platform',
          data: Object.values(userCount),
        },
      ];
      setUserData(adminDataChart);
    }
  }, [userCount]);

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between">
        <div className="ml-1 pt-2">
          <p className="text-lg font-bold leading-4 text-gray-600">
            User Count
          </p>
          <p className="text-[34px] font-bold text-navy-700 dark:text-white">
            <span className="text-sm font-medium leading-6 text-gray-600">
              {/* Visitors */}
            </span>
          </p>
        </div>
      </div>
      <div className="h-[300px] w-full pb-0 pt-10">
        <BarChart
          chartData={userData || adminDataChart}
          chartOptions={adminDataChartOptions}
        />
      </div>
    </Card>
  );
};

export default AdminDataChart;

'use client';
import {
  MdBarChart,
  MdBoy,
  MdDashboard,
  MdEditDocument,
  MdHealing,
  MdLocalHospital,
  MdVaccines,
} from 'react-icons/md';

import Widget from '@component/widget/Widget';
import Admin from '../../../pages/dashboard/[[...index]]';
import {
  DASHBOARD_RESP,
  dashboardData,
} from '@src/variables/data-tables/tableDataDevelopment';
import ActivityTable from '@src/components/admin/adminUsers/dashboard/ActivityCard';
import AdminDataChart from '@src/components/admin/adminUsers/dashboard/AdminDataChart';
import AdminPieChartCard from '@src/components/admin/adminUsers/dashboard/AdminPieChart';
import UserGrowthChart from '@src/components/admin/adminUsers/dashboard/UserGrowthChart';
import AdminItemsChart from '@src/components/admin/adminUsers/dashboard/AdminItems';
import { useGetDashboard } from '@src/utils/reactQuery';
import { useRecoilValue } from 'recoil';
import { userState } from '@src/utils/recoil/user';
import { DashboardResponse, UserData } from '@src/api/utils/interface';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';

const Dashboard = () => {
  const user: UserData = useRecoilValue(userState);
  const [cardData, setCardData] = useState({});
  const [activities, setActivities] = useState([]);
  const [userCount, setUserCount] = useState({});
  const [adminAssets, setAdminAssets] = useState({});
  const {
    data: adminDashboard,
    isLoading,
    refetch,
  }: any = useGetDashboard(user.phoneNumber);

  useEffect(() => {
    refetch();
  }, []);

  const handleMapData = (data: DashboardResponse) => {
    setCardData(data.cardData);
    setActivities(data.activities);
    setUserCount(data.donutChart.users);
    setAdminAssets(data.donutChart.adminData);
  };

  useEffect(() => {
    if (!isLoading && adminDashboard && adminDashboard.data) {
      handleMapData(adminDashboard.data);
    }
  }, [adminDashboard, isLoading, refetch]);

  return (
    <Admin>
      <>
        <div>
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
            <Widget
              icon={<MdLocalHospital className="sm:h-7 sm:w-12" />}
              title={'Diagnostic Centers'}
              //@ts-ignore
              subtitle={cardData?.dcUsers || 0}
            />
            <Widget
              icon={<MdBoy className="sm:h-7 sm:w-12" />}
              title={'Omerald Users'}
              //@ts-ignore
              subtitle={cardData?.userCount || 0}
            />
            <Widget
              icon={<MdHealing className="sm:h-7 sm:w-12" />}
              title={'Diagnosed Conditions'}
              //@ts-ignore
              subtitle={cardData?.diagnosedConditionCount || 0}
            />
            <Widget
              icon={<MdVaccines className="sm:h-7 sm:w-12" />}
              title={'Vaccines'}
              //@ts-ignore
              subtitle={cardData?.vaccineCount || 0}
            />
            <Widget
              icon={<MdEditDocument className="sm:h-7 sm:w-12" />}
              title={'Reports'}
              //@ts-ignore
              subtitle={cardData?.reportCount || 0}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <UserGrowthChart />
            <AdminItemsChart adminAssets={adminAssets} />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
            {activities && <ActivityTable tableData={activities} />}
            <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
              {userCount && <AdminDataChart userCount={userCount} />}
              {userCount && <AdminPieChartCard userCount={userCount} />}
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
            <Button
              isLoading
              loadingText="Fetching Data"
              variant="outline"
              size="xxl"
            >
              Button
            </Button>
          </div>
        )}
      </>
    </Admin>
  );
};

export default Dashboard;

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

const Dashboard = () => {
  const { cardData, activities }: DASHBOARD_RESP = dashboardData;

  return (
    <Admin>
      <div>
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
          <Widget
            icon={<MdLocalHospital className="sm:h-7 sm:w-12" />}
            title={'Diagnostic Centers'}
            //@ts-ignore
            subtitle={cardData?.dcUsers}
          />
          <Widget
            icon={<MdBoy className="sm:h-7 sm:w-12" />}
            title={'Omerald Users'}
            //@ts-ignore
            subtitle={cardData?.userCount}
          />
          <Widget
            icon={<MdHealing className="sm:h-7 sm:w-12" />}
            title={'Diagnosed Conditions'}
            //@ts-ignore
            subtitle={cardData?.diagnosedConditionCount}
          />
          <Widget
            icon={<MdVaccines className="sm:h-7 sm:w-12" />}
            title={'Vaccines'}
            //@ts-ignore
            subtitle={cardData?.vaccineCount}
          />
          <Widget
            icon={<MdEditDocument className="sm:h-7 sm:w-12" />}
            title={'Reports'}
            //@ts-ignore
            subtitle={cardData?.reportCount}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <UserGrowthChart />
          <AdminItemsChart />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          <ActivityTable tableData={activities} />
          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <AdminDataChart />
            <AdminPieChartCard />
          </div>
        </div>
      </div>
    </Admin>
  );
};

export default Dashboard;

'use client';
import MiniCalendar from '@component/calendar/MiniCalendar';
import WeeklyRevenue from '@src/components/admin/backup/default/WeeklyRevenue';
import TotalSpent from '@src/components/admin/backup/default/TotalSpent';
import PieChartCard from '@src/components/admin/backup/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
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
import CheckTable from '@src/components/admin/backup/default/CheckTable';
import ComplexTable from '@src/components/admin/backup/default/ComplexTable';
import DailyTraffic from '@src/components/admin/backup/default/DailyTraffic';
import TaskCard from '@src/components/admin/backup/default/TaskCard';
import tableDataCheck from '@variables/data-tables/tableDataCheck';
import tableDataComplex from '@variables/data-tables/tableDataComplex';
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
        {/* Card widget */}

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
          {/* <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={'New Tasks'}
            subtitle={'145'}
          />
          <Widget
            icon={<IoMdHome className="h-6 w-6" />}
            title={'Total Projects'}
            subtitle={'$2433'}
          /> */}
        </div>

        {/* Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <UserGrowthChart />
          <AdminItemsChart />
        </div>

        {/* Tables & Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Check Table */}
          {/* <div>
            <CheckTable tableData={tableDataCheck} />
          </div> */}

          {/* Complex Table , Task & Calendar */}

          <ActivityTable tableData={activities} />

          {/* Traffic chart & Pie Chart */}

          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <AdminDataChart />
            <AdminPieChartCard />
          </div>

          {/* Task chart & Calendar */}

          {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <TaskCard />
            <div className="grid grid-cols-1 rounded-[20px]">
              <MiniCalendar />
            </div>
          </div> */}
        </div>
      </div>
    </Admin>
  );
};

export default Dashboard;

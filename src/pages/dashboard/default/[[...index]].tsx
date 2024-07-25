'use client';
import MiniCalendar from '@component/calendar/MiniCalendar';
import WeeklyRevenue from '@component/admin/default/WeeklyRevenue';
import TotalSpent from '@component/admin/default/TotalSpent';
import PieChartCard from '@component/admin/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';

import Widget from '@component/widget/Widget';
import CheckTable from '@component/admin/default/CheckTable';
import ComplexTable from '@component/admin/default/ComplexTable';
import DailyTraffic from '@component/admin/default/DailyTraffic';
import TaskCard from '@component/admin/default/TaskCard';
import tableDataCheck from '@variables/data-tables/tableDataCheck';
import tableDataComplex from '@variables/data-tables/tableDataComplex';
import Admin from '../[[...index]]';

const Dashboard = () => {
  return (
    <Admin>
      <div>
        {/* Card widget */}

        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={'Earnings'}
            subtitle={'$340.5'}
          />
          <Widget
            icon={<IoDocuments className="h-6 w-6" />}
            title={'Spend this month'}
            subtitle={'$642.39'}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={'Sales'}
            subtitle={'$574.34'}
          />
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={'Your Balance'}
            subtitle={'$1,000'}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={'New Tasks'}
            subtitle={'145'}
          />
          <Widget
            icon={<IoMdHome className="h-6 w-6" />}
            title={'Total Projects'}
            subtitle={'$2433'}
          />
        </div>

        {/* Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <TotalSpent />
          <WeeklyRevenue />
        </div>

        {/* Tables & Charts */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Check Table */}
          <div>
            <CheckTable tableData={tableDataCheck} />
          </div>

          {/* Traffic chart & Pie Chart */}

          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <DailyTraffic />
            <PieChartCard />
          </div>

          {/* Complex Table , Task & Calendar */}

          <ComplexTable tableData={tableDataComplex} />

          {/* Task chart & Calendar */}

          <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
            <TaskCard />
            <div className="grid grid-cols-1 rounded-[20px]">
              <MiniCalendar />
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
};

export default Dashboard;

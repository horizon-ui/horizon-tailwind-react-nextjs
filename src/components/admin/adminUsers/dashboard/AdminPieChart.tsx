import PieChart from '@component/charts/PieChart';
import {
  adminDonoughtChartData,
  adminDonoughtOptions,
  pieChartData,
  pieChartOptions,
} from '@variables/charts';
import Card from '@component/card';
import DonoughtChart from '@src/components/charts/DonutChart';

const AdminPieChartCard = ({ userCount }) => {
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Users / Application
          </h4>
        </div>
      </div>

      <div className="mb-auto mt-10 flex h-[220px] w-full items-center justify-center">
        <DonoughtChart
          chartOptions={adminDonoughtOptions}
          chartData={Object.values(userCount) || adminDonoughtChartData}
        />
      </div>
    </Card>
  );
};

export default AdminPieChartCard;

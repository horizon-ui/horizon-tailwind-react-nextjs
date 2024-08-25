import { NextApiRequest, NextApiResponse } from 'next';
import { getAllActivity } from '../services/activityService';
import { getReportCountService } from '../services/report/reportService';
import { getVaccineService } from '../services/vaccine/vaccineService';
import { getDcCountService } from '../services/diagnosedConditionService';
import { fetchDiagnosedData } from '../services/commonService';
import {
  BASE_DC_REPORTS,
  BASE_DC_URL,
  BASE_OMERALD_URL,
} from '@src/constants/api';
import { getAdminCountService } from '../services/userService';
import { getDoseCountService } from '../services/vaccine/doseService';
import { getDurationCountService } from '../services/vaccine/durationService';
import { getParameterCountService } from '../services/report/parameterService';
import { getSampleCountService } from '../services/report/sampleService';

/**
 * Controller function to handle fetching dashboard data
 * @param req Next.js API request object
 * @param res Next.js API response object
 */
export const readDashboardController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    // Parallelizing data fetching for faster response times
    const [
      reportCount,
      vaccineCount,
      adminCount,
      doseCount,
      parameterCount,
      durationCount,
      sampleCount,
      diagnosedConditionCount,
      activities,
      dcData,
      omeraldData,
      dcReports,
    ] = await Promise.all([
      getReportCountService(),
      getVaccineService(),
      getAdminCountService(),
      getDoseCountService(),
      getParameterCountService(),
      getDurationCountService(),
      getSampleCountService(),
      getDcCountService(),
      getAllActivity(),
      fetchDiagnosedData(BASE_DC_URL),
      fetchDiagnosedData(BASE_OMERALD_URL),
      fetchDiagnosedData(BASE_DC_REPORTS),
    ]);

    // Aggregating data more efficiently
    const dc = dcData?.find((dc) => dc != null);

    const totalTests =
      dc?.branches?.reduce(
        (total, branch) => total + (branch.tests?.length || 0),
        0,
      ) || 0;

    const cardData = {
      dcUsers: dcData?.length || 0,
      userCount: omeraldData?.length || 0,
      vaccineCount,
      reportCount,
      diagnosedConditionCount,
    };

    const lineCharts = {
      userCounts: {
        dcUsers: getCountByMonth(dcData),
        omeraldUsers: getCountByMonth(omeraldData),
      },
      dcAssetCount: {
        dcReports: getCountByMonth(dcReports),
        dcTests: getCountByMonth([{ createdDate: new Date() }]), // This is a placeholder for better optimization
      },
    };

    const donutChart = {
      users: {
        omeraldUsers: omeraldData?.length || 0,
        adminUsers: adminCount,
        diagUsers: dcData?.length || 0,
      },
      dcDocs: {
        totalDcReport: dcReports?.length || 0,
        totalDcTests: totalTests,
      },
      adminData: {
        vaccineCount,
        doseCount,
        doseDurationCount: durationCount,
        reportCount,
        parameterCount,
        sampleCount,
        diagnosedConditionCount,
      },
    };

    const aggregatedResponse = {
      cardData,
      activities,
      lineCharts,
      donutChart,
    };

    res.status(200).json(aggregatedResponse);
  } catch (error) {
    console.error('Error creating dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch data: ' + error.message });
  }
};

/**
 * Function to get counts by month
 * @param data Data array
 * @returns Array of objects with month and count
 */
function getCountByMonth(data: any[]): CountByMonth[] {
  if (!data || !data.length) return [];

  const countMap = new Map<string, number>();

  data.forEach((item) => {
    // Parsing the date
    const date = new Date(item.createdDate);
    if (isNaN(date.getTime())) return; // Skip invalid dates

    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    countMap.set(key, (countMap.get(key) ?? 0) + 1);
  });

  return Array.from(countMap, ([month, count]) => ({ month, count }));
}

interface CountByMonth {
  month: string;
  count: number;
}

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
 * Controller function to handle fetching all users
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const readDashboardController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const reportCount = (await getReportCountService()) || 0;
    const vaccineCount = (await getVaccineService()) || 0;
    const adminCount = (await getAdminCountService()) || 0;
    const doseCount = (await getDoseCountService()) || 0;
    const parameterCount = (await getParameterCountService()) || 0;
    const durationCount = (await getDurationCountService()) || 0;
    const sampleCount = (await getSampleCountService()) || 0;
    const diagnosedConditionCount = (await getDcCountService()) || 0;
    const activities = await getAllActivity();
    const dcData = await fetchDiagnosedData(BASE_DC_URL);
    const omeraldData = await fetchDiagnosedData(BASE_OMERALD_URL);
    const dcReports = await fetchDiagnosedData(BASE_DC_REPORTS);

    const dc = dcData.find((dc) => dc != null);

    const totalTests =
      dc?.branches?.reduce((total, branch) => {
        return total + branch.tests.length; // Add the number of tests in the current branch
      }, 0) || 0;

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
        omeraldUsers: getCountByMonth(omeraldData) || 0,
      },
      dcAssetCount: {
        dcReports: getCountByMonth(dcReports) || 0,
        dcTests: getCountByMonth(totalTests),
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
        vaccineCount: vaccineCount,
        doseCount: doseCount,
        doseDurationCount: durationCount,
        reportCount: reportCount,
        parameterCount: parameterCount,
        sampleCount: sampleCount,
        diagnosedConditionCount: diagnosedConditionCount,
      },
    };

    const aggregatedResponse = {
      cardData,
      activities: activities,
      lineCharts: lineCharts,
      donutChart: donutChart,
    };

    res.status(200).json(aggregatedResponse);
  } catch (error) {
    console.error('Error creating dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch data ' + error.message });
  }
};

interface CountByMonth {
  month: string;
  count: number;
}

function getCountByMonth(data: any[]): CountByMonth[] {
  const countMap = new Map<string, number>();
  if (!data || !data?.length) return [];
  data.forEach((item) => {
    // Attempt to parse the date
    const date = new Date(item.createdDate);

    // Validate if the date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date format: ${item.createdDate}`);
      return; // Skip invalid dates
    }

    // Format the month and year
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    // Update the count in the map
    countMap.set(key, (countMap.get(key) ?? 0) + 1);
  });

  // Convert Map to array of objects
  return Array.from(countMap, ([month, count]) => ({ month, count }));
}

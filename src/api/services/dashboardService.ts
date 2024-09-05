import dashboard, { DashboardDocument } from '@src/api/models/dashboard';

export const readDashboardService = async (): Promise<DashboardDocument[]> => {
  return await dashboard.find().exec();
};

import report, { ReportDocument } from '@src/api/models/reports/report';

export const createReportService = async (
  reportObj: ReportDocument,
): Promise<ReportDocument> => {
  return await report.create(reportObj);
};

export const readReportService = async (): Promise<ReportDocument[]> => {
  return await report.find();
};

export const updateReportService = async (
  id: string | string[],
  reportObj: any,
): Promise<ReportDocument[]> => {
  return await report.findByIdAndUpdate(id, reportObj, { new: true });
};

export const deleteReportService = async (
  id: string | string[],
): Promise<ReportDocument> => {
  return await report.findByIdAndDelete(id);
};

export const getReportCountService = async (): Promise<number> => {
  try {
    const count = await report.countDocuments();
    return count;
  } catch (error) {
    console.error('Error fetching report count:', error);
    throw new Error('Failed to fetch report count');
  }
};

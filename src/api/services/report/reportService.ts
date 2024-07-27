import report, { ReportDocument } from '@src/api/models/reports/report';

export const createReportService = async (
  reportObj: ReportDocument,
): Promise<ReportDocument> => {
  return await report.create(reportObj);
};

export const readReportService = async (): Promise<ReportDocument[]> => {
  return await report.find().populate('parameter').populate('sample');
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

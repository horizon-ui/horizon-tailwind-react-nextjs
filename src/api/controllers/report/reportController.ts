import { ReportDocument } from '@src/api/models/reports/report';
import {
  createReportService,
  deleteReportService,
  readReportService,
  updateReportService,
} from '@src/api/services/report/reportService';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '@src/api/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';

export const readAllReportController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const reportResp = await readReportService();
    if (!reportResp) {
      throw internalServerError('Error fetching report');
    }
    res.status(200).json(reportResp);
  } catch (error) {
    throw internalServerError('Error fetching report ' + error.message);
  }
};

export const createReportController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { testName, sampleName, isActive, parameters, components } =
      _req.body;
    if (!testName) {
      throw validationError('invalid report name');
    }
    const reportObj: ReportDocument = {
      testName,
      sampleName,
      parameters,
      isActive,
      components,
    };

    const reportResp = await createReportService(reportObj);

    if (!reportResp) {
      throw internalServerError('Error creating report');
    }
    res.status(200).json(reportResp);
  } catch (error) {
    if (error.code === 11000) {
      throw badRequestError('report with name already exists');
    } else {
      throw internalServerError(error.message);
    }
  }
};

export const updateReportController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!_req.body) {
      validationError('invalid report object');
    }

    const report = await updateReportService(id, _req.body);
    if (!report) {
      internalServerError('Error updating report');
    }
    res.status(200).json(report);
  } catch (error) {
    throw internalServerError('Error updating report: ' + error.message);
  }
};

export const deleteReportController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!id || id == null || id == '') {
      internalServerError('Invalid report id');
    }
    const report = await deleteReportService(id);
    if (!report) {
      internalServerError('Error deleting vacccine');
    }
    res.status(200).json(report);
  } catch (error) {
    throw internalServerError('Error deleting vacccine');
  }
};

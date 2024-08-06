import {
  createReportController,
  deleteReportController,
  readAllReportController,
  updateReportController,
} from '@src/api/controllers/report/reportController';
import { apiHandlerWrapper } from '@src/api/utils/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';

const handleReadAllReports = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await readAllReportController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleCreateAllReport = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    await createReportController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleUpdateReport = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateReportController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleDeleteReport = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'DELETE') {
    await deleteReportController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export const readAllReportHandler = apiHandlerWrapper(handleReadAllReports);
export const createReportHandler = apiHandlerWrapper(handleCreateAllReport);
export const updateReportHandler = apiHandlerWrapper(handleUpdateReport);
export const deleteReportHandler = apiHandlerWrapper(handleDeleteReport);

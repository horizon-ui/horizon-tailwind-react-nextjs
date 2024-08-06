import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWrapper } from '../utils/apiHandler';
import { badRequestError } from '../utils/error';
import {
  getAllDiagnosticSettingController,
  updateDiagnosticSettingController,
} from '../controllers/diagnosticSettingController';

// Handler for GET all Diagnostics
const handleGetAllDiagnosticSetting = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await getAllDiagnosticSettingController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Handler for POST create Diagnostic
const handleUpdateDiagnosticSetting = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateDiagnosticSettingController(req, res);
  } else {
    throw badRequestError('Create activity supports POST requests only');
  }
};

// Export wrapped handlers
export const getAllDiagnosticSettingHandler = apiHandlerWrapper(
  handleGetAllDiagnosticSetting,
);
export const updateDiagnosticSettingHandler = apiHandlerWrapper(
  handleUpdateDiagnosticSetting,
);

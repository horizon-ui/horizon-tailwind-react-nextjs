import { NextApiRequest, NextApiResponse } from 'next';
import { internalServerError } from '../utils/error';
import {
  getAllDiagnosticSettingService,
  updateDiagnosticSettingService,
} from '../services/diagnosticSettingService';

/**
 * Controller function to handle fetching all users
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const getAllDiagnosticSettingController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const diagnosticSetting = await getAllDiagnosticSettingService();
    res.status(200).json(diagnosticSetting);
  } catch (error) {
    console.error('Error fetching diagnostic settings:', error);
    res.status(500).json({ error: 'Failed to fetch diagnostics' });
  }
};

/**
 * Controller function to create diagnostic
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const updateDiagnosticSettingController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let setting = await updateDiagnosticSettingService(
      //@ts-ignore
      _req?.query.id,
      _req.body,
    );
    res.status(200).json(setting);
  } catch (error: any) {
    console.error('Error creating diagnostic:', error);
    throw internalServerError();
  }
};

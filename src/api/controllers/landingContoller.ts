import { NextApiRequest, NextApiResponse } from 'next';
import { internalServerError } from '../utils/error';
import {
  getAllLandingSettingService,
  updateLandingSettingService,
} from '../services/LandingSettingService';

/**
 * Controller function to handle fetching all users
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const getAllLandingSettingController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    //@ts-ignore
    const Landing = await getAllLandingSettingService();
    res.status(200).json(Landing);
  } catch (error) {
    console.error('Error fetching Landing:', error);
    res.status(500).json({ error: 'Failed to fetch Landing' });
  }
};

/**
 * Controller function to create user
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const updateLandingSettingController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    //@ts-ignore
    const Landing = await updateLandingSettingService(_req.query.id, _req.body);
    res.status(200).json(Landing);
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw internalServerError();
  }
};

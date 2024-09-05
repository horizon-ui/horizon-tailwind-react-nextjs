import { NextApiRequest, NextApiResponse } from 'next';
import { internalServerError } from '../utils/error';
import {
  getAllUserSetting,
  updateUserSettingService,
} from '../services/userSettingService';

/**
 * Controller function to handle fetching all users
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const getAllUserSettingController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const userSetting = await getAllUserSetting();
    res.status(200).json(userSetting);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Controller function to create user
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const updateUserSettingController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    if (!_req.query.id || _req.query.id === null) {
      return res.status(500).send('Invalid Id');
    }

    //@ts-ignore
    let setting = await updateUserSettingService(_req?.query.id, _req.body);
    if (setting != null) {
      res.status(200).json(setting);
    } else {
      throw internalServerError('');
    }
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw internalServerError();
  }
};

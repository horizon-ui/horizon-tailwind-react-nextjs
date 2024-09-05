import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWrapper } from '../utils/apiHandler';
import { badRequestError } from '../utils/error';
import {
  getAllUserSettingController,
  updateUserSettingController,
} from '../controllers/userSettingController';

// Handler for GET all users
const handleGetAllUserSetting = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await getAllUserSettingController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Handler for POST create user
const handleCreateUserSetting = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateUserSettingController(req, res);
  } else {
    throw badRequestError('Create activity supports POST requests only');
  }
};

// Export wrapped handlers
export const getAllUserSettingHandler = apiHandlerWrapper(
  handleGetAllUserSetting,
);
export const updateUserSettingHandler = apiHandlerWrapper(
  handleCreateUserSetting,
);

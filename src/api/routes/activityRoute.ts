import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWrapper } from '../utils/apiHandler';
import { badRequestError } from '../utils/error';
import {
  createActivityController,
  getAllActivitiesController,
} from '../controllers/activityController';

// Handler for GET all users
const handleGetAllActivities = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await getAllActivitiesController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Handler for POST create user
const handleCreateActiviy = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    await createActivityController(req, res);
  } else {
    throw badRequestError('Create activity supports POST requests only');
  }
};

// Export wrapped handlers
export const getAllActivityHandler = apiHandlerWrapper(handleGetAllActivities);
export const createActivityHandler = apiHandlerWrapper(handleCreateActiviy);

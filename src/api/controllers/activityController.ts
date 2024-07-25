import { NextApiRequest, NextApiResponse } from 'next';
import { createUserService } from '../services/userService';
import { UserData } from '../utils/interface';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '../utils/error';
import {
  createActivityService,
  getAllActivity,
} from '../services/activityService';

/**
 * Controller function to handle fetching all users
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const getAllActivitiesController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const activities = await getAllActivity();
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Controller function to create user
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const createActivityController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { title, description, action, user } = _req.body;

    if (!title || !description || !action) {
      throw validationError('Invalid input');
    }

    if (!user) {
      throw badRequestError('Invalid User Object');
    }

    let activityObj = {
      title,
      description,
      action,
      user,
    };
    const activity = await createActivityService(activityObj);
    res.status(200).json(activity);
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw internalServerError();
  }
};

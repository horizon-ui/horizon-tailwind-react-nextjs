import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUserService,
  deleteUserService,
  getAllUsers,
  getUserByPhone,
  revertDeleteUserService,
  softDeleteUserService,
  updateUserService,
} from '../services/userService';
import { UserData } from '../utils/interface';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '../utils/error';

/**
 * Controller function to handle fetching all users
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const getAllUsersController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Controller function to handle fetching users by phone number
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const getUserByPhoneController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let phoneNumber = _req.query.phoneNumber as string;

    if (!phoneNumber) {
      res.status(400).json({ error: 'Phone number is required' });
      return;
    }
    phoneNumber = decodeURIComponent(phoneNumber);
    const users = await getUserByPhone(phoneNumber);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Controller function to create user
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const createUserController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let { role, userName, phoneNumber } = _req.body;

    if (!role || !userName || !phoneNumber) {
      throw validationError('Invalid user, role or phoneNumber');
    }

    let user: UserData = {
      role: role,
      userName: userName,
      phoneNumber: phoneNumber,
    };

    if (!user) {
      throw badRequestError('Invalid User Object');
    }

    const users = await createUserService(user);
    res.status(200).json(users);
  } catch (error: any) {
    if (error.code === 11000) {
      console.error('Phone number already exists:');
      throw badRequestError('Phone number already exists');
    } else {
      console.error('Error creating user:', error);
      throw internalServerError();
    }
  }
};

/**
 * Controller function to delete user permenantly
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const deleteUserController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { phoneNumber } = _req.query;

    if (Array.isArray(phoneNumber) || typeof phoneNumber !== 'string') {
      throw badRequestError('Invalid PhooneNumber Object');
    }

    const users = await deleteUserService(phoneNumber);
    res.status(200).json(users);
  } catch (error: any) {
    {
      console.error('Error creating user:', error);
      throw internalServerError();
    }
  }
};

/**
 * Controller function to delete user temporarily
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const softDeleteUserController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { phoneNumber } = _req.query;

    if (Array.isArray(phoneNumber) || typeof phoneNumber !== 'string') {
      throw badRequestError('Invalid PhooneNumber');
    }

    const users = await softDeleteUserService(phoneNumber);
    res.status(200).json(users);
  } catch (error: any) {
    {
      console.error('Error deleting user:', error);
      throw internalServerError();
    }
  }
};

/**
 * Controller function to delete user temporarily
 * @param req Next.js API request object (Unused in this specific function)
 * @param res Next.js API response object
 */
export const revertDeletedUserController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { phoneNumber } = _req.query;

    if (Array.isArray(phoneNumber) || typeof phoneNumber !== 'string') {
      throw badRequestError('Invalid PhooneNumber');
    }

    const users = await revertDeleteUserService(phoneNumber);
    res.status(200).json(users);
  } catch (error: any) {
    {
      console.error('Error reverted user:', error);
      throw internalServerError();
    }
  }
};

export const updateUserController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let phoneNumber = _req.query.phoneNumber as string;

    if (!phoneNumber) {
      res.status(400).json({ error: 'Phone number is required' });
      return;
    }
    phoneNumber = decodeURIComponent(phoneNumber);
    console.log('phoneNumber', phoneNumber);
    if (Array.isArray(phoneNumber) || typeof phoneNumber !== 'string') {
      throw badRequestError('Invalid PhooneNumber');
    }
    const users = await updateUserService(phoneNumber, _req.body);
    res.status(200).json(users);
  } catch (error: any) {
    {
      console.error('Error deleting user:', error);
      throw internalServerError();
    }
  }
};

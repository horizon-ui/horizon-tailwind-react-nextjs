import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByPhoneController,
  updateUserController,
} from '../controllers/userController';
import { apiHandlerWrapper } from '../utils/apiHandler';
import { badRequestError } from '../utils/error';

// Handler for GET all users
const handleGetAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getAllUsersController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Handler for GET user by phone
const handleGetUserByPhone = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await getUserByPhoneController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Handler for POST create user
const handleCreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await createUserController(req, res);
  } else {
    throw badRequestError('Create user supports POST requests only');
  }
};

// Handler for POST create user
const handleDeleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    await deleteUserController(req, res);
  } else {
    throw badRequestError('Delete user supports Delete requests only');
  }
};

const handleupdateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    await updateUserController(req, res);
  } else {
    throw badRequestError('Revert deleted user supports PUT requests only');
  }
};

// Export wrapped handlers
export const getAllUsersHandler = apiHandlerWrapper(handleGetAllUsers);
export const getUserByPhoneHandler = apiHandlerWrapper(handleGetUserByPhone);
export const createUserHandler = apiHandlerWrapper(handleCreateUser);
export const deleteUserHandler = apiHandlerWrapper(handleDeleteUser);
export const updateUserHandler = apiHandlerWrapper(handleupdateUser);

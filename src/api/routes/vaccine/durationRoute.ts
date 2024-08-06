import { NextApiRequest, NextApiResponse } from 'next';
import { badRequestError } from '../../utils/error';
import { apiHandlerWrapper } from '@src/api/utils/apiHandler';
import {
  createDurationController,
  deleteDurationController,
  readDurationController,
  updateDurationController,
} from '@src/api/controllers/vaccine/durationController';

const readDurationRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    readDurationController(req, res);
  } else {
    throw badRequestError('Get duration supports Get requests only');
  }
};
const createDurationRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    await createDurationController(req, res);
  } else {
    throw badRequestError('Create duration supports POST requests only');
  }
};
const updateDurationRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateDurationController(req, res);
  } else {
    throw badRequestError('Update duration supports PUT requests only');
  }
};
const deleteDurationRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'DELETE') {
    await deleteDurationController(req, res);
  } else {
    throw badRequestError('DELETE duration supports DELETE requests only');
  }
};

export const readDurationHandler = apiHandlerWrapper(readDurationRoute);
export const createDurationHandler = apiHandlerWrapper(createDurationRoute);
export const updateDurationHandler = apiHandlerWrapper(updateDurationRoute);
export const deleteDurationHandler = apiHandlerWrapper(deleteDurationRoute);

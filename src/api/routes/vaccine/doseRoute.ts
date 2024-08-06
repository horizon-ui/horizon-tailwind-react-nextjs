import { NextApiRequest, NextApiResponse } from 'next';
import { badRequestError } from '../../utils/error';
import { apiHandlerWrapper } from '@src/api/utils/apiHandler';
import {
  createDoseController,
  deleteDoseController,
  readDoseController,
  updateDoseController,
} from '@src/api/controllers/vaccine/doseController';

const readDoseRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    readDoseController(req, res);
  } else {
    throw badRequestError('Get dose supports Get requests only');
  }
};
const createDoseRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await createDoseController(req, res);
  } else {
    throw badRequestError('Create dose supports POST requests only');
  }
};
const updateDoseRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    await updateDoseController(req, res);
  } else {
    throw badRequestError('Update dose supports PUT requests only');
  }
};
const deleteDoseRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    await deleteDoseController(req, res);
  } else {
    throw badRequestError('DELETE dose supports DELETE requests only');
  }
};

export const readDoseHandler = apiHandlerWrapper(readDoseRoute);
export const createDoseHandler = apiHandlerWrapper(createDoseRoute);
export const updateDoseHandler = apiHandlerWrapper(updateDoseRoute);
export const deleteDoseHandler = apiHandlerWrapper(deleteDoseRoute);

import { NextApiRequest, NextApiResponse } from 'next';
import { badRequestError } from '../../utils/error';
import { apiHandlerWrapper } from '@src/api/utils/apiHandler';
import {
  createVaccineController,
  deleteVaccineController,
  readVaccineController,
  updateVaccineController,
} from '@src/api/controllers/vaccine/vaccineController';

const readVaccinesRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    readVaccineController(req, res);
  } else {
    throw badRequestError('Get vaccine supports Get requests only');
  }
};
const createVaccinesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    await createVaccineController(req, res);
  } else {
    throw badRequestError('Create vaccine supports POST requests only');
  }
};
const updateVaccinesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateVaccineController(req, res);
  } else {
    throw badRequestError('Update vaccine supports PUT requests only');
  }
};
const deleteVaccinesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'DELETE') {
    await deleteVaccineController(req, res);
  } else {
    throw badRequestError('DELETE vaccine supports DELETE requests only');
  }
};

export const readVaccinesHandler = apiHandlerWrapper(readVaccinesRoute);
export const createVaccinesHandler = apiHandlerWrapper(createVaccinesRoute);
export const updateVaccinesHandler = apiHandlerWrapper(updateVaccinesRoute);
export const deleteVaccinesHandler = apiHandlerWrapper(deleteVaccinesRoute);

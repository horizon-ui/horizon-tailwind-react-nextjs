import {
  createSampleController,
  deleteSampleController,
  readAllSampleController,
  updateSampleController,
} from '@src/api/controllers/report/sampleController';
import { apiHandlerWrapper } from '@src/api/utils/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';

const handleReadAllSamples = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await readAllSampleController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleCreateAllSample = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    await createSampleController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleUpdateSample = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateSampleController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleDeleteSample = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'DELETE') {
    await deleteSampleController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export const readAllSampleHandler = apiHandlerWrapper(handleReadAllSamples);
export const createSampleHandler = apiHandlerWrapper(handleCreateAllSample);
export const updateSampleHandler = apiHandlerWrapper(handleUpdateSample);
export const deleteSampleHandler = apiHandlerWrapper(handleDeleteSample);

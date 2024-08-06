import {
  createParamController,
  deleteParamController,
  readAllParamController,
  updateParamController,
} from '@src/api/controllers/report/paramController';
import { apiHandlerWrapper } from '@src/api/utils/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';

const handleReadAllParams = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await readAllParamController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleCreateAllParam = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    await createParamController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleUpdateParam = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    await updateParamController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const handleDeleteParam = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    await deleteParamController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export const readAllParamHandler = apiHandlerWrapper(handleReadAllParams);
export const createParamHandler = apiHandlerWrapper(handleCreateAllParam);
export const updateParamHandler = apiHandlerWrapper(handleUpdateParam);
export const deleteParamHandler = apiHandlerWrapper(handleDeleteParam);

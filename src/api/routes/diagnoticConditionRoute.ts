import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWrapper } from '@src/api/utils/apiHandler';
import {
  createDiagnosedConditionController,
  deleteDiagnosedConditionController,
  readDiagnosedConditionController,
  updateDiagnosedConditionController,
} from '@src/api/controllers/diagnosedConditionController';
import { badRequestError } from '../utils/error';

const readDiagnosedConditionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    readDiagnosedConditionController(req, res);
  } else {
    throw badRequestError('Get DiagnosedCondition supports Get requests only');
  }
};
const createDiagnosedConditionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    await createDiagnosedConditionController(req, res);
  } else {
    throw badRequestError(
      'Create DiagnosedCondition supports POST requests only',
    );
  }
};
const updateDiagnosedConditionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateDiagnosedConditionController(req, res);
  } else {
    throw badRequestError(
      'Update DiagnosedCondition supports PUT requests only',
    );
  }
};
const deleteDiagnosedConditionRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'DELETE') {
    await deleteDiagnosedConditionController(req, res);
  } else {
    throw badRequestError(
      'DELETE DiagnosedCondition supports DELETE requests only',
    );
  }
};

export const readDiagnosedConditionHandler = apiHandlerWrapper(
  readDiagnosedConditionRoute,
);
export const createDiagnosedConditionHandler = apiHandlerWrapper(
  createDiagnosedConditionRoute,
);
export const updateDiagnosedConditionHandler = apiHandlerWrapper(
  updateDiagnosedConditionRoute,
);
export const deleteDiagnosedConditionHandler = apiHandlerWrapper(
  deleteDiagnosedConditionRoute,
);

import {
  createDiagnosedConditionService,
  deleteDiagnosedConditionService,
  readDiagnosedConditionService,
  updateDiagnosedConditionService,
} from '@src/api/services/diagnosedConditionService';
import { internalServerError, validationError } from '@src/api/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';

export const readDiagnosedConditionController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const diagnosedCondition = await readDiagnosedConditionService();
    if (!diagnosedCondition) {
      throw internalServerError('Error fetching vacccine');
    }
    return res.status(200).json(diagnosedCondition);
  } catch (error) {
    throw internalServerError('Error fetching vacccine');
  }
};

export const createDiagnosedConditionController = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { name, aliases, description, status } = req.body;

    // Validate the input
    if (!name) {
      return res
        .status(400)
        .json({ message: 'diagnosedCondition name required' });
    }

    // Prepare diagnosedCondition object
    const diagnosedConditionObj = {
      name,
      description,
      aliases,
      status,
    };

    // Call the service to create a diagnosedCondition
    const diagnosedCondition = await createDiagnosedConditionService(
      diagnosedConditionObj,
    );

    // Check if the diagnosedCondition creation was successful
    if (!diagnosedCondition) {
      return res
        .status(500)
        .json({ message: 'Error creating diagnosedCondition' });
    }

    // Send success response
    return res.status(201).json(diagnosedCondition);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal Server Error' + error.message });
  }
};

export const updateDiagnosedConditionController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!_req.body) {
      validationError('invalid diagnosedCondition object');
    }

    const diagnosedCondition = await updateDiagnosedConditionService(
      id,
      _req.body,
    );
    if (!diagnosedCondition) {
      internalServerError('Error updating vacccine');
    }
    res.status(200).json(diagnosedCondition);
  } catch (error) {
    throw internalServerError('Error updating vacccine');
  }
};

export const deleteDiagnosedConditionController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!id || id == null || id == '') {
      internalServerError('Invalid diagnosedCondition id');
    }
    const diagnosedCondition = await deleteDiagnosedConditionService(id);
    if (!diagnosedCondition) {
      internalServerError('Error deleting vacccine');
    }
    res.status(200).json(diagnosedCondition);
  } catch (error) {
    throw internalServerError('Error deleting vacccine');
  }
};

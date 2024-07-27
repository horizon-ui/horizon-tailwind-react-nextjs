import {
  createDoseService,
  deletedDoseService,
  readDoseService,
  updatedDoseService,
} from '@src/api/services/vaccine/doseService';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '@src/api/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';

export const readDoseController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const dose = await readDoseService();
    return res.status(200).json(dose);
  } catch (error) {
    throw internalServerError('Error fetching dose ' + error);
  }
};

export const createDoseController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { name, doseType, vaccine, doseDuration } = _req.body;
    if (!name || !doseType || !vaccine || !doseDuration) {
      throw validationError('dose name, type, vaccine, and duration required');
    }
    const doseObj = {
      name,
      doseType,
      vaccine,
      doseDuration,
    };

    const doseResp = await createDoseService(doseObj);
    if (!doseResp) {
      throw internalServerError('Error creating dose');
    }
    res.status(200).json(doseResp);
  } catch (error) {
    if (error.code === 11000) {
      throw badRequestError('dose with value already exists');
    } else {
      throw internalServerError('Error creating vacccine');
    }
  }
};

export const updateDoseController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!_req.body) {
      validationError('invalid dose object');
    }

    const dose = await updatedDoseService(id, _req.body);
    if (!dose) {
      internalServerError('Error updating vacccine');
    }
    res.status(200).json(dose);
  } catch (error) {
    throw internalServerError('Error updating vacccine');
  }
};

export const deleteDoseController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!id || id == null || id == '') {
      internalServerError('Invalid dose id');
    }
    const dose = await deletedDoseService(id);
    if (!dose) {
      internalServerError('Error deleting vacccine');
    }
    res.status(200).json(dose);
  } catch (error) {
    throw internalServerError('Error deleting vacccine');
  }
};

import {
  createdoseDurationService,
  deletedoseDurationService,
  readdoseDurationService,
  updatedoseDurationService,
} from '@src/api/services/vaccine/durationService';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '@src/api/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';

export const readDurationController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const duration = await readdoseDurationService();
    if (!duration) {
      throw internalServerError('Error fetching vacccine');
    }
    return res.status(200).json(duration);
  } catch (error) {
    throw internalServerError('Error fetching vacccine');
  }
};

export const createDurationController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { duration, type } = _req.body;
    if (!duration || !type) {
      validationError('duration name and type required');
    }
    const durationObj = {
      duration,
      type,
    };

    const durationResp = await createdoseDurationService(durationObj);
    if (!durationResp) {
      throw internalServerError('Error creating vacccine');
    }
    res.status(200).json(durationResp);
  } catch (error) {
    if (error.code === 11000) {
      throw badRequestError('duration with value already exists');
    } else {
      throw internalServerError('Error creating vacccine');
    }
  }
};

export const updateDurationController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!_req.body) {
      validationError('invalid duration object');
    }

    const duration = await updatedoseDurationService(id, _req.body);
    if (!duration) {
      internalServerError('Error updating vacccine');
    }
    res.status(200).json(duration);
  } catch (error) {
    throw internalServerError('Error updating vacccine');
  }
};

export const deleteDurationController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!id || id == null || id == '') {
      internalServerError('Invalid duration id');
    }
    const duration = await deletedoseDurationService(id);
    if (!duration) {
      internalServerError('Error deleting vacccine');
    }
    res.status(200).json(duration);
  } catch (error) {
    throw internalServerError('Error deleting vacccine');
  }
};

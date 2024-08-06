import { ParamDocument } from '@src/api/models/reports/parameter';
import {
  createParamService,
  deleteParamService,
  readParamService,
  updateParamService,
} from '@src/api/services/report/parameterService';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '@src/api/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';

export const readAllParamController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const paramResp = await readParamService();
    if (!paramResp) {
      throw internalServerError('Error fetching param');
    }
    res.status(200).json(paramResp);
  } catch (error) {
    throw internalServerError('Error fetching param');
  }
};

export const createParamController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { parameter, description, isActive, remedy, unit, alias, bioRef } =
      _req.body;
    if (!parameter) {
      throw validationError(
        'param name, description, isActive, and validity required',
      );
    }
    const paramObj: ParamDocument = {
      parameter,
      description,
      isActive,
      remedy,
      unit,
      alias,
      bioRef,
    };

    const paramResp = await createParamService(paramObj);
    if (!paramResp) {
      throw internalServerError('Error creating param');
    }
    res.status(200).json(paramResp);
  } catch (error) {
    if (error.code === 11000) {
      throw badRequestError('param with name already exists');
    } else {
      throw internalServerError(error.message);
    }
  }
};

export const updateParamController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!_req.body) {
      validationError('invalid param object');
    }

    const param = await updateParamService(id, _req.body);
    if (!param) {
      internalServerError('Error updating param');
    }
    res.status(200).json(param);
  } catch (error) {
    throw internalServerError('Error updating param: ' + error.message);
  }
};

export const deleteParamController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!id || id == null || id == '') {
      internalServerError('Invalid param id');
    }
    const param = await deleteParamService(id);
    if (!param) {
      internalServerError('Error deleting vacccine');
    }
    res.status(200).json(param);
  } catch (error) {
    throw internalServerError('Error deleting vacccine');
  }
};

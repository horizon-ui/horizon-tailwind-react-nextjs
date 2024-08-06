import { SampleDocument } from '@src/api/models/reports/sample';
import {
  createSampleService,
  readSampleService,
} from '@src/api/services/report/sampleService';
import {
  deleteSampleService,
  updateSampleService,
} from '@src/api/services/report/sampleService';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '@src/api/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';

export const readAllSampleController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const sampleResp = await readSampleService();
    if (!sampleResp) {
      throw internalServerError('Error fetching sample');
    }
    res.status(200).json(sampleResp);
  } catch (error) {
    throw internalServerError('Error fetching sample');
  }
};

export const createSampleController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { name, description, isActive, validity } = _req.body;
    if (!name) {
      throw validationError('sample name required');
    }
    const sampleObj: SampleDocument = {
      name,
      description,
      isActive,
      validity,
    };

    const sampleResp = await createSampleService(sampleObj);
    if (!sampleResp) {
      throw internalServerError('Error creating sample');
    }
    res.status(200).json(sampleResp);
  } catch (error) {
    if (error.code === 11000) {
      throw badRequestError('Sample with name already exists');
    } else {
      throw internalServerError(error.message);
    }
  }
};

export const updateSampleController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!_req.body) {
      validationError('invalid sample object');
    }

    const sample = await updateSampleService(id, _req.body);
    if (!sample) {
      internalServerError('Error updating sample');
    }
    res.status(200).json(sample);
  } catch (error) {
    throw internalServerError('Error updating sample: ' + error.message);
  }
};

export const deleteSampleController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!id || id == null || id == '') {
      internalServerError('Invalid sample id');
    }
    const sample = await deleteSampleService(id);
    if (!sample) {
      internalServerError('Error deleting vacccine');
    }
    res.status(200).json(sample);
  } catch (error) {
    throw internalServerError('Error deleting vacccine');
  }
};

import {
  createVaccineService,
  deleteVaccineService,
  readVaccineService,
  updateVaccineService,
} from '@src/api/services/vaccine/vaccineService';
import {
  badRequestError,
  internalServerError,
  validationError,
} from '@src/api/utils/error';
import { NextApiRequest, NextApiResponse } from 'next';

export const readVaccineController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const vaccine = await readVaccineService();
    if (!vaccine) {
      throw internalServerError('Error fetching vacccine');
    }
    return res.status(200).json(vaccine);
  } catch (error) {
    throw internalServerError('Error fetching vacccine');
  }
};

export const createVaccineController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { name } = _req.body;
    if (!name) {
      validationError('vaccine name required');
    }
    const vaccineObj = {
      name,
    };

    const vaccine = await createVaccineService(vaccineObj);
    if (!vaccine) {
      throw internalServerError('Error creating vacccine');
    }
    res.status(200).json(vaccine);
  } catch (error) {
    if (error.code === 11000) {
      throw badRequestError('Vaccine with name already exists');
    } else {
      throw internalServerError('Error creating vacccine');
    }
  }
};

export const updateVaccineController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!_req.body) {
      validationError('invalid vaccine object');
    }

    const vaccine = await updateVaccineService(id, _req.body);
    if (!vaccine) {
      internalServerError('Error updating vacccine');
    }
    res.status(200).json(vaccine);
  } catch (error) {
    throw internalServerError('Error updating vacccine');
  }
};

export const deleteVaccineController = async (
  _req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { id } = _req.query;
    if (!id || id == null || id == '') {
      internalServerError('Invalid vaccine id');
    }
    const vaccine = await deleteVaccineService(id);
    if (!vaccine) {
      internalServerError('Error deleting vacccine');
    }
    res.status(200).json(vaccine);
  } catch (error) {
    throw internalServerError('Error deleting vacccine');
  }
};

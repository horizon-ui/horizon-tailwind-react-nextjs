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
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const { name } = req.body;

    // Validate the input
    if (!name) {
      return res.status(400).json({ message: 'Vaccine name required' });
    }

    // Prepare vaccine object
    const vaccineObj = {
      name,
    };

    // Call the service to create a vaccine
    const vaccine = await createVaccineService(vaccineObj);

    // Check if the vaccine creation was successful
    if (!vaccine) {
      return res.status(500).json({ message: 'Error creating vaccine' });
    }

    // Send success response
    return res.status(201).json(vaccine);
  } catch (error) {
    // Handle specific errors
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Vaccine with this name already exists' });
    } else {
      // Log error details for debugging
      console.error('Error creating vaccine:', error);

      // Send generic error response
      return res.status(500).json({ message: 'Internal Server Error' });
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

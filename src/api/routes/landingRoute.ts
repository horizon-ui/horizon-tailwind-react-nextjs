import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWrapper } from '../utils/apiHandler';
import { badRequestError } from '../utils/error';
import {
  getAllLandingSettingController,
  updateLandingSettingController,
} from '../controllers/landingContoller'; // Adjust controller imports for LandingSetting

// Handler for GET all Landing Settings
const handleGetAllLandingSetting = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await getAllLandingSettingController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Handler for PUT update Landing Setting
const handleUpdateLandingSetting = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'PUT') {
    await updateLandingSettingController(req, res);
  } else {
    throw badRequestError('Update landing setting supports PUT requests only');
  }
};

// Export wrapped handlers
export const getAllLandingSettingHandler = apiHandlerWrapper(
  handleGetAllLandingSetting,
);
export const updateLandingSettingHandler = apiHandlerWrapper(
  handleUpdateLandingSetting,
);

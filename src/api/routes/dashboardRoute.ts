import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWrapper } from '../utils/apiHandler';
import { readDashboardController } from '../controllers/dashboardController';

// Handler for GET all users
const handleReadDashboard = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'GET') {
    await readDashboardController(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Export wrapped handlers
export const readDashboardHandler = apiHandlerWrapper(handleReadDashboard);

import { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllUsersHandler,
  updateUserHandler,
} from '../../../api/routes/userRoute';
import { connectDB } from '../../../api/utils/db';

// Connect to MongoDB before handling API requests
connectDB().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect
});

// handle request to fetch all users
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  updateUserHandler(req, res);
}

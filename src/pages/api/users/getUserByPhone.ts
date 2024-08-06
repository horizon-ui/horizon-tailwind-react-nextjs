import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../api/utils/db';
import { getUserByPhoneHandler } from '../../../api/routes/userRoute';

// Connect to MongoDB before handling API requests
connectDB().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect
});

// Handle request for fetching user by phone
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  getUserByPhoneHandler(req, res);
}

import { createDurationHandler } from '@src/api/routes/vaccine/durationRoute';
import { connectDB } from '@src/api/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

// Connect to MongoDB before handling API requests
connectDB().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  createDurationHandler(req, res);
}

import { NextApiRequest, NextApiResponse } from 'next';
import { createSampleHandler } from '@src/api/routes/report/sampleRoute';
import { connectDB } from '@src/api/utils/db';
import { createParamHandler } from '@src/api/routes/report/paramRoute';

// Connect to MongoDB before handling API requests
connectDB().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if unable to connect
});

// handle request to fetch all users
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  createParamHandler(req, res);
}

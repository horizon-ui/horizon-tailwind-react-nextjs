import { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware, { errorHandler } from '../middleware';
import Cors from 'cors';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add more methods as needed
    origin: '*', // Allow all origins
  }),
);

export const apiHandlerWrapper =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await cors(req, res);
      await handler(req, res);
    } catch (err) {
      errorHandler(err, req, res, () => {});
    }
  };

import { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from '../middleware';

export const apiHandlerWrapper = (handler: Function) => 
  async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handler(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
};

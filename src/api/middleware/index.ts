import { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from '../utils/interface';

export const errorHandler = (
  err: unknown,
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function,
) => {
  if (isCustomError(err)) {
    const customError = err as CustomError;
    return res.status(customError.statusCode).json({
      reasonCode: customError.reasonCode,
      message: customError.message,
    });
  }

  console.error('Unexpected error:', err);
  return res.status(500).json({
    reasonCode: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
  });
};

const isCustomError = (err: unknown): err is CustomError => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'reasonCode' in err &&
    'statusCode' in err &&
    'message' in err
  );
};

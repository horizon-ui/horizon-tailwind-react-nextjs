import { CustomError } from "./interface";

const createCustomError = (reasonCode: string, message: string, statusCode: number): 
CustomError => ({
    reasonCode,
    message,
    statusCode,
});
  
const notFoundError = (message = 'Resource not found'): CustomError => 
    createCustomError('NOT_FOUND', message, 404);
  
const badRequestError = (message = 'Bad request'): CustomError => 
    createCustomError('BAD_REQUEST', message, 400);
  
const unauthorizedError = (message = 'Unauthorized access'): CustomError => 
    createCustomError('UNAUTHORIZED', message, 401);
  
const internalServerError = (message = 'Internal server error'): CustomError => 
    createCustomError('INTERNAL_SERVER_ERROR', message, 500);

const validationError = (message = 'Validation Error'): CustomError => 
    createCustomError('VALIDATION_ERROR', message, 501);
  
export { createCustomError, notFoundError, badRequestError, unauthorizedError, 
    internalServerError, validationError };
  
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.logError(err.message)
  err.stack && logger.logError(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);

  // Customize based on error type
  res.status(500).json({
    success: false,
    message: 'Server Error',
  });
};

export default errorHandler;

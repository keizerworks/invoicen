import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '@/libs/logger';

export async function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info(
      `[${req.method}] ${req.protocol}://${req.get('host')}${
        req.originalUrl
      } PARAMS: ${JSON.stringify(req.params) || null} QUERY: ${
        JSON.stringify(req.query) || null
      } BODY: ${JSON.stringify(req.body) || null}, Cookies ${JSON.stringify(
        req.cookies
      )}`,
      'HTTP'
    );

    next();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

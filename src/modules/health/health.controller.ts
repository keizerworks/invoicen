import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '@/db';
import { sql } from 'drizzle-orm';
import logger from '../../libs/logger';

export async function getHeathHandler(req: Request, res: Response) {
  try {
    const status = await db.execute(sql`select 1`);

    if (!status) {
      logger.error('Database is not connected', 'HEALTH');

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Database is not connected',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: 'Server is running',
    });
  } catch (err: any) {
    logger.error(err.message, 'HEALTH');

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });
  }
}

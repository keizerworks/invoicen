import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import env from '@/libs/env';
import jwt from 'jsonwebtoken';

import 'express';
import { User, userTable } from '@/db/schema/user';
import db from '../db';
import { eq } from 'drizzle-orm';

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

async function getUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    // remove bearer from the token
    const token = authorization?.split(' ')[1];

    if (!token) {
      req.user = null;
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'please login to access this route',
      });
      return;
    }

    // verify the token
    const { id } = jwt.verify(token, env.ACCESS_TOKEN_PUBLIC_KEY) as {
      id: number;
    };

    if (!id) {
      req.user = null;
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'please login to access this route',
      });
      return;
    }

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (!user) {
      req.user = null;
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'please login to access this route',
      });
      return;
    }

    req.user = user ?? null;

    next();
    return;
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

export default getUserMiddleware;

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  PostLoginBody,
  PostRefreshAccessTokenBody,
  PostResendOtpEmailBody,
  PostSendForgotPasswordOTPBody,
  PostSignupBody,
  PostVerifyForgotPasswordOTPBody,
  PostVerifyOtpBody,
} from './auth.schema';
import db from '@/db';
import { userTable } from '@/db/schema/user';
import { and, eq } from 'drizzle-orm';
import { compare, genSalt, hash } from 'bcrypt';
import { sendMail } from '@/libs/mailer';
import logger from '@/libs/logger';
import jwt from 'jsonwebtoken';
import env from '@/libs/env';

export async function postSignupHandler(
  req: Request<{}, {}, PostSignupBody>,
  res: Response
) {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser.length) {
      res.status(StatusCodes.CONFLICT).json({
        message: 'email already in use',
      });
      return;
    }

    // generate a hash of the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // generate random otp of 4 digits
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Create a new user
    await db.insert(userTable).values({
      name,
      email,
      password: hashedPassword,
      otp,
      is_onboarded: false,
      is_verified: false,
    });

    logger.info(`User ${email} signed up`, 'AUTH');

    // send otp to the user
    sendMail({
      to: email,
      subject: 'OTP for account verification',
      html: `Your OTP is ${otp}`,
    });

    res.status(StatusCodes.CREATED).json({
      message: 'otp sent to your email',
    });

    return;
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

export async function postVerifyOtpHandler(
  req: Request<{}, {}, PostVerifyOtpBody>,
  res: Response
) {
  try {
    const { email, otp } = req.body;

    const user = await db
      .select()
      .from(userTable)
      .where(and(eq(userTable.email, email), eq(userTable.otp, otp)));

    if (!user.length) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'invalid otp',
      });

      return;
    }

    // update the user as verified
    await db
      .update(userTable)
      .set({ is_verified: true, otp: null })
      .where(eq(userTable.email, email));

    logger.info(`User ${email} verified`, 'AUTH');

    res.status(StatusCodes.OK).json({
      message: 'account verified',
    });

    return;
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

export async function postResendOtpEmail(
  req: Request<{}, {}, PostResendOtpEmailBody>,
  res: Response
) {
  try {
    const { email } = req.body;

    // check if account is already verified
    const users = await db
      .select()
      .from(userTable)
      .where(and(eq(userTable.email, email)));

    if (!users.length) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'account not found',
      });

      return;
    }

    if (users[0].is_verified) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'account already verified',
      });

      return;
    }

    // send otp to the user
    sendMail({
      to: email,
      subject: 'OTP for account verification',
      html: `Your OTP is ${users[0].otp}`,
    });

    res.status(StatusCodes.OK).json({
      message: 'otp sent to your email',
    });

    return;
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

export async function postLoginHandler(
  req: Request<{}, {}, PostLoginBody>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(userTable)
      .where(and(eq(userTable.email, email)));

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'account not found',
      });

      return;
    }

    if (!user.is_verified) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'account not verified',
      });

      return;
    }

    // compare the password
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'invalid credentials',
      });

      return;
    }

    // generate jwt token with an object payload
    const accessToken = jwt.sign(
      { id: user.id.toString() },
      env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        algorithm: 'RS512',
        expiresIn: '15m',
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id.toString() },
      env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        algorithm: 'RS512',
        expiresIn: '7d',
      }
    );

    res.status(StatusCodes.OK).json({
      message: 'login successful',
      payload: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });

    return;
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

export async function postSendForgotPasswordOTPHandler(
  req: Request<{}, {}, PostSendForgotPasswordOTPBody>,
  res: Response
) {
  try {
    const { email } = req.body;

    // find the user
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'account not found',
      });

      return;
    }

    // generate random otp of 4 digits
    const otp = Math.floor(1000 + Math.random() * 9000);

    // update the user with the new otp
    await db.update(userTable).set({ otp }).where(eq(userTable.email, email));

    // send otp to the user
    sendMail({
      to: email,
      subject: 'OTP for password reset',
      html: `Your OTP is ${otp}`,
    });

    res.status(StatusCodes.OK).json({
      message: 'otp sent to your email',
    });
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

export async function postVerifyForgotPasswordOTPHandler(
  req: Request<{}, {}, PostVerifyForgotPasswordOTPBody>,
  res: Response
) {
  try {
    const { email, otp, password } = req.body;

    // find the user
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'account not found',
      });

      return;
    }

    if (user.otp !== otp) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'invalid otp',
      });

      return;
    }

    // generate a hash of the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // update the user with the new password
    await db
      .update(userTable)
      .set({ password: hashedPassword, otp: null })
      .where(eq(userTable.email, email));

    res.status(StatusCodes.OK).json({
      message: 'password reset successful',
    });
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

export function getMeHandler(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized',
    });

    return;
  }

  res.status(StatusCodes.OK).json({
    message: 'success',
    payload: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });

  return;
}

export async function postRefreshAccessTokenHandler(
  req: Request<{}, {}, PostRefreshAccessTokenBody>,
  res: Response
) {
  try {
    const { refresh_token } = req.body;
    const { id } = jwt.verify(refresh_token, env.REFRESH_TOKEN_PUBLIC_KEY) as {
      id: number;
    };

    if (!id) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'invalid token',
      });

      return;
    }

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'user not found',
      });

      return;
    }

    const accessToken = jwt.sign(
      { id: user.id.toString() },
      env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        algorithm: 'RS512',
        expiresIn: '15m',
      }
    );

    res.status(StatusCodes.OK).json({
      message: 'token refreshed',
      payload: {
        access_token: accessToken,
      },
    });

    return;
  } catch (err) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });

    return;
  }
}

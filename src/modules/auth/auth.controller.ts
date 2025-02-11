import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostSignupBody, PostVerifyOtpBody } from './auth.schema';
import db from '@/db';
import { userTable } from '@/db/schema/user';
import { and, eq } from 'drizzle-orm';
import { genSalt, hash } from 'bcrypt';
import { sendMail } from '@/libs/mailer';

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
      is_verified: false,
    });

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
      .set({ is_verified: true })
      .where(eq(userTable.email, email));

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

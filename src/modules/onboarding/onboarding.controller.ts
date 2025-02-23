import { Request, Response } from 'express';
import { PostOnboardingBody } from './onboarding.schema';
import { StatusCodes } from 'http-status-codes';
import db from '@/db';
import { organizationTable } from '@/db/schema/organization';
import { User, userTable } from '@/db/schema/user';
import logger from '@/libs/logger';
import { uploadFileToS3 } from "@/libs/s3";

export async function postOnboardingHandler(
  req: Request<{}, {}, PostOnboardingBody>,
  res: Response
) {
  try {
    // This route will get user from req iteself i.e. only logged in user can be onboarded
    const { org_name, org_slug } = req.body;
    const user = req.user as User;

    // check if user is already onboarded
    if (req.user?.is_onboarded) {
      res.status(StatusCodes.CONFLICT).json({
        message: 'user is already onboarded',
      });

      return;
    }

    let logoUrl: string | null = null;
    if (req.file) {
      logoUrl = await uploadFileToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
    }

    // create new organization for user
    await db.insert(organizationTable).values({
      name: org_name,
      user_id: user.id,
      slug: org_slug,
      logo_url: logoUrl,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await db.update(userTable).set({
      is_onboarded: true,
    });

    logger.info(`user ${user.id} onboarded on org ${org_name}`, 'ONBOARD');

    res.status(StatusCodes.CREATED).json({
      message: 'organization created successfully',
    });

    return;
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: 'Internal server error',
    });

    return;
  }
}

export async function getOnboardingStatus(req: Request, res: Response) {
  try {
    const user = req.user as User;

    res.status(StatusCodes.OK).json({
      is_onboarded: user.is_onboarded ?? false,
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

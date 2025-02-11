import { Router } from 'express';
import { validateRequestBody } from '../../middleware/validate-request.middleware';
import { postSignupBodySchema, postVerifyOtpBodySchema } from './auth.schema';
import { postSignupHandler, postVerifyOtpHandler } from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateRequestBody(postSignupBodySchema),
  postSignupHandler
);

authRouter.post(
  '/verify',
  validateRequestBody(postVerifyOtpBodySchema),
  postVerifyOtpHandler
);

export default authRouter;

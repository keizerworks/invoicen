import { Router } from 'express';
import { validateRequestBody } from '../../middleware/validate-request.middleware';
import {
  postResendOtpEmailBodySchema,
  postSignupBodySchema,
  postVerifyOtpBodySchema,
} from './auth.schema';
import {
  postResendOtpEmail as postResendOtpEmailHandler,
  postSignupHandler,
  postVerifyOtpHandler,
} from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateRequestBody(postSignupBodySchema),
  postSignupHandler
);

authRouter.post(
  '/otp/verify',
  validateRequestBody(postVerifyOtpBodySchema),
  postVerifyOtpHandler
);

authRouter.post(
  '/otp/resend',
  validateRequestBody(postResendOtpEmailBodySchema),
  postResendOtpEmailHandler
);

export default authRouter;

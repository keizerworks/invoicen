import { Router } from 'express';
import { validateRequestBody } from '../../middleware/validate-request.middleware';
import {
  postLoginBodySchema,
  postResendOtpEmailBodySchema,
  postSendForgotPasswordOTPBodySchema,
  postSignupBodySchema,
  postVerifyOtpBodySchema,
} from './auth.schema';
import {
  postLoginHandler,
  postResendOtpEmail as postResendOtpEmailHandler,
  postSendForgotPasswordOTPHandler,
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

authRouter.post(
  '/login',
  validateRequestBody(postLoginBodySchema),
  postLoginHandler
);

authRouter.post(
  '/forgot-password/otp',
  validateRequestBody(postSendForgotPasswordOTPBodySchema),
  postSendForgotPasswordOTPHandler
);

export default authRouter;

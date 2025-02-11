import { Router } from 'express';
import { validateRequestBody } from '../../middleware/validate-request.middleware';
import { postSignupBodySchema } from './auth.schema';
import { postSignupHandler } from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateRequestBody(postSignupBodySchema),
  postSignupHandler
);

export default authRouter;

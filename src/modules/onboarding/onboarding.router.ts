import { validateRequestBody } from '@/middleware/validate-request.middleware';
import { Router } from 'express';
import { postOnboardingSchema } from './onboarding.schema';
import { postOnboardingHandler } from './onboarding.controller';
import fileUpload from '@/libs/file-upload';

const onboardingRouter = Router();

onboardingRouter.post(
  '/onboard',
  fileUpload.single('org_logo'),
  validateRequestBody(postOnboardingSchema),
  postOnboardingHandler
);

export default onboardingRouter;

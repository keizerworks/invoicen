import { validateRequestBody } from '@/middleware/validate-request.middleware';
import { Router } from 'express';
import { postOnboardingSchema } from './onboarding.schema';
import {
  getOnboardingStatus,
  postOnboardingHandler,
} from './onboarding.controller';
import {fileUpload} from '@/middleware/file-upload';

const onboardingRouter = Router();

onboardingRouter.post(
  '/onboard',
  fileUpload.single('org_logo'),
  validateRequestBody(postOnboardingSchema),
  postOnboardingHandler
);

onboardingRouter.get('/status', getOnboardingStatus);

export default onboardingRouter;

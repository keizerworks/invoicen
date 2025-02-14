import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from '@/libs/logger';
import healthRouter from './modules/health/health.routes';
import { requestLoggerMiddleware } from './middleware/request-logger.middleware';
import authRouter from './modules/auth/auth.routes';
import env from './libs/env';
import getUserMiddleware from './middleware/get-user.middleware';
import onboardingRouter from './modules/onboarding/onboarding.router';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);
app.use(express.json());

app.use(requestLoggerMiddleware);
app.use('/health', healthRouter);
app.use('/auth', authRouter);

app.use(getUserMiddleware);
app.use('/onboarding', onboardingRouter);

const PORT = env.PORT || 8000;

(async () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`, 'SYSTEM');
  });
})();

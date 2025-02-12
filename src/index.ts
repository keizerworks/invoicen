import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from '@/libs/logger.js';
import healthRouter from '@/modules/health/health.routes.js';
import { requestLoggerMiddleware } from './middleware/request-logger.middleware.js';
import authRouter from './modules/auth/auth.routes.js';
import env from './libs/env.js';

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

const PORT = env.PORT || 8000;

(async () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`, 'SYSTEM');
  });
})();

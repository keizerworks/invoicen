import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from '@/libs/logger';
import healthRouter from '@/modules/health/health.routes';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);
app.use(express.json());

app.use('/health', healthRouter);

const PORT = process.env.PORT || 8000;

(async () => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`, 'SYSTEM');
  });
})();

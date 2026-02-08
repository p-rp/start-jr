import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { config } from './config';
import authRoutes from './routes/v1/auth';
import userRoutes from './routes/v1/users';
import dashboardRoutes from './routes/v1/dashboard';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { sanitizeInput, logRequest } from './middleware/sanitize';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { swaggerDocs } from './docs/swagger';

dotenv.config();

const app = express();
const PORT = config.port;

app.use(helmet());

app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(logRequest);
app.use(sanitizeInput);
app.use(rateLimitMiddleware);

app.use('/api-docs', swaggerDocs);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

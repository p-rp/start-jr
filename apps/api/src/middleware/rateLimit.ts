import rateLimit from 'express-rate-limit';
import { config } from '../config';

export const rateLimitMiddleware = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: config.rateLimit.message,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRateLimitMiddleware = rateLimit({
  windowMs: config.authRateLimit.windowMs,
  max: config.authRateLimit.max,
  message: config.authRateLimit.message,
  standardHeaders: true,
  legacyHeaders: false,
});

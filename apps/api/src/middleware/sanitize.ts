import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

const sanitizeString = (str: string): string => {
  if (typeof str !== 'string') return str;
  return str.replace(/[<>]/g, '');
};

const sanitizeObject = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }
  
  if (typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[sanitizeString(key)] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }
  
  return obj;
};

const removeSensitiveFields = (body: any): void => {
  const sensitiveFields = ['password', 'currentPassword', 'newPassword', 'confirmPassword'];
  for (const field of sensitiveFields) {
    if (body[field]) {
      body[field] = '[REDACTED]';
    }
  }
};

export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (req.body) {
      req.body = sanitizeObject(req.body);
    }
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }
    if (req.params) {
      req.params = sanitizeObject(req.params);
    }
    next();
  } catch (error) {
    logger.error('Sanitization error:', error);
    next(error);
  }
};

export const logRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`${req.method} ${req.path}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });
  
  next();
};

export const logRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.method !== 'GET' && req.body) {
    const logBody = { ...req.body };
    removeSensitiveFields(logBody);
    logger.debug('Request body:', logBody);
  }
  next();
};

import { config } from '../config';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  info(message: string, meta?: any): void {
    if (config.nodeEnv !== 'test') {
      console.log(this.formatMessage('info', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (config.nodeEnv !== 'test') {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }

  error(message: string, meta?: any): void {
    if (config.nodeEnv !== 'test') {
      console.error(this.formatMessage('error', message, meta));
    }
  }

  debug(message: string, meta?: any): void {
    if (config.nodeEnv === 'development') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }
}

export const logger = new Logger();

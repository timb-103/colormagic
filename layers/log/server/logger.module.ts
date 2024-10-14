import { type Logger, pino } from 'pino';
import loggerConfig from './logger.config.js';

export function getLoggerModule(): Logger {
  return pino(loggerConfig);
}

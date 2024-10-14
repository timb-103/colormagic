import { type LoggerOptions } from 'pino';

const loggerConfig: LoggerOptions = {
  level: process.env.LOG_LEVEL ?? 'debug',
  enabled: process.env.NODE_ENV !== 'test',
  formatters: process.env.NODE_ENV === 'production'
    ? {
        level: (label) => {
          return { level: label };
        }
      }
    : undefined,
  transport: process.env.NODE_ENV !== 'production'
    ? {
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname'
        }
      }
    : undefined
};

export default loggerConfig;

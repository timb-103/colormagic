import { MongoClient } from 'mongodb';
import type { Logger } from 'pino';
import mongoConfig from './mongo.config';

export function getMongoModule(logger: Logger): MongoClient {
  logger.info('initializing mongo module');

  return new MongoClient(mongoConfig.url, {
    ignoreUndefined: true
  });
}

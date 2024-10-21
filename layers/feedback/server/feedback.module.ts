import { type Db } from 'mongodb';
import type { Logger } from 'pino';
import { FeedbackService } from './services/feedback.service';
import type { FeedbackEntity } from './entities/feedback.entity';
import feedbackConfig from './feedback.config';
import { FeedbackRepository } from './repositories/feedback.repository';
import { FeedbackValidation } from './validations/feedback.validation';

export interface FeedbackModule {
  service: FeedbackService
  validation: FeedbackValidation
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getFeedbackModule(
  db: Db,
  logger: Logger
): FeedbackModule {
  logger.info('initializing feedback module');

  const collection = db.collection<FeedbackEntity>(feedbackConfig.collectionName);
  const repository = new FeedbackRepository(collection);
  const service = new FeedbackService(repository);
  const validation = new FeedbackValidation();

  return {
    service,
    validation
  };
}

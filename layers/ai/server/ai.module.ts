import type { Logger } from 'pino';
import { AIService } from './services/ai.service';
import type { OpenAIService } from '~/layers/openai/server/services/openai.service';

export interface AIModule {
  service: AIService
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getAIModule(
  logger: Logger,
  openAIService: OpenAIService
): AIModule {
  logger.info('initializing ai module');

  const service = new AIService(openAIService);

  return {
    service
  };
}

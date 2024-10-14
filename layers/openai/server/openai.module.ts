import type { Logger } from 'pino';
import OpenAI from 'openai';
import openAIConfig from './openai.config';
import { OpenAIService } from './services/openai.service';

export interface OpenAIModule {
  service: OpenAIService
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getOpenAIModule(logger: Logger): OpenAIModule {
  logger.info('initializing openai module');

  const client = new OpenAI({
    apiKey: openAIConfig.apiKey
  });

  const service = new OpenAIService(client);

  return {
    service
  };
}

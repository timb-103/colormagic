import type { Logger } from 'pino';
import { getAIModule, type AIModule } from '~/layers/ai/server/ai.module';
import { getLoggerModule } from '~/layers/log/server/logger.module';
import { getMongoModule } from '~/layers/mongo/server/mongo.module';
import { getOpenAIModule } from '~/layers/openai/server/openai.module';
import { getPaletteModule, type PaletteModule } from '~/layers/palette/server/palette.module';

interface Modules {
  ai: AIModule
  logger: Logger
  palette: PaletteModule
}

export let modules: Modules;

export async function setup(): Promise<void> {
  const logger = getLoggerModule();

  try {
    const mongodb = getMongoModule(logger);

    logger.info('connecting to configured mongodb');
    await mongodb.connect();

    const db = mongodb.db();

    logger.info('initializing modules and resolving dependencies');
    const openai = getOpenAIModule(logger);
    const ai = getAIModule(logger, openai.service);
    const palette = getPaletteModule(db, logger, ai.service);

    modules = {
      ai,
      logger,
      palette
    };
  } catch (error) {
    logger.warn({ err: error }, 'initializing setup failed');
  }
}

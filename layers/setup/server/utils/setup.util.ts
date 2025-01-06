import type { Logger } from 'pino';
import { getAIModule, type AIModule } from '~/layers/ai/server/ai.module';
import { getAuthModule, type AuthModule } from '~/layers/auth/server/auth.module';
import { getGoogleModule, type GoogleModule } from '~/layers/google/server/google.module';
import { getHealthModule, type HealthModule } from '~/layers/health/server/health.module';
import { getImageModule, type ImageModule } from '~/layers/image/server/image.module';
import { getLoggerModule } from '~/layers/log/server/logger.module';
import { getMongoModule } from '~/layers/mongo/server/mongo.module';
import { getOpenAIModule } from '~/layers/openai/server/openai.module';
import { getPaletteModule, type PaletteModule } from '~/layers/palette/server/palette.module';
import { getUserModule, type UserModule } from '~/layers/user/server/user.module';

interface Modules {
  ai: AIModule
  logger: Logger
  palette: PaletteModule
  image: ImageModule
  auth: AuthModule
  user: UserModule
  google: GoogleModule
  health: HealthModule
}

export let modules: Modules;

export let isModulesReady = false;

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
    const image = getImageModule(logger, palette.service);
    const user = getUserModule(db, logger);
    const google = getGoogleModule(logger);
    const auth = getAuthModule(logger, user.service, google.service);
    const health = getHealthModule(db, logger);

    await Promise.all([
      palette.setup(),
      user.setup()
    ]);

    modules = {
      ai,
      logger,
      palette,
      image,
      auth,
      user,
      google,
      health
    };

    isModulesReady = true;
  } catch (error) {
    logger.warn({ err: error }, 'initializing setup failed');
  }
}

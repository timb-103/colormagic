import { getLoggerModule } from '~/layers/log/server/logger.module';

export default defineNitroPlugin(() => {
  const logger = getLoggerModule();
  setup().catch(() => { logger.warn('error initializing setup in nitro plugin'); });
});

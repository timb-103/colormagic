import { mapEventToLog, isAPIRequest } from '../helpers/log.helper';
import { getLoggerModule } from '../logger.module';

export default defineNitroPlugin((nitroApp) => {
  const logger = getLoggerModule();

  /** @description add the response time so we can calculate after request */
  nitroApp.hooks.hook('request', (event) => {
    event.context.responseTime = Date.now();
  });

  /** @description log a successful request */
  nitroApp.hooks.hook('afterResponse', (event) => {
    if (isAPIRequest(event)) {
      logger.info(mapEventToLog(event), 'request completed');
    }
  });

  /** @description log a request error only from a api endpoint */
  nitroApp.hooks.hook('error', (error: any, { event }) => {
    if (event !== undefined && isAPIRequest(event)) {
      if (error?.statusCode >= 500) {
        logger.error(mapEventToLog(event, error), 'request completed');
      } else {
        logger.info(mapEventToLog(event, error), 'request completed');
      }
    }
  });
});

import type { Logger } from 'pino';
import { OgService } from './services/og.service';
import { OgValidation } from './validations/og.validation';
import type { PaletteService } from '~/layers/palette/server/services/palette.service';

export interface OgModule {
  service: OgService
  validation: OgValidation
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getOgModule(
  logger: Logger,
  paletteService: PaletteService
): OgModule {
  logger.info('initializing og module');

  const service = new OgService(paletteService);
  const validation = new OgValidation();

  return {
    service,
    validation
  };
}

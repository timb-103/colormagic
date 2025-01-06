import type { Logger } from 'pino';
import { ImageService } from './services/image.service';
import { ImageValidation } from './validations/image.validation';
import type { PaletteService } from '~/layers/palette/server/services/palette.service';

export interface ImageModule {
  service: ImageService
  validation: ImageValidation
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getImageModule(
  logger: Logger,
  paletteService: PaletteService
): ImageModule {
  logger.info('initializing image module');

  const service = new ImageService(paletteService);
  const validation = new ImageValidation();

  return {
    service,
    validation
  };
}

import { type Db } from 'mongodb';
import type { Logger } from 'pino';
import type { PaletteEntity } from './entities/palette.entity';
import paletteConfig from './palette.config';
import { PaletteRepository } from './repositories/palette.repository';
import { PaletteService } from './services/palette.service';
import { PaletteValidation } from './validations/palette.validation';
import type { AIService } from '~/layers/ai/server/services/ai.service';

export interface PaletteModule {
  service: PaletteService
  validation: PaletteValidation
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getPaletteModule(
  db: Db,
  logger: Logger,
  aiService: AIService
): PaletteModule {
  logger.info('initializing palette module');

  const collection = db.collection<PaletteEntity>(paletteConfig.collectionName);
  const repository = new PaletteRepository(collection);
  const service = new PaletteService(repository, aiService);
  const validation = new PaletteValidation();

  return {
    service,
    validation
  };
}

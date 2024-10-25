import { type Db } from 'mongodb';
import type { Logger } from 'pino';
import type { PaletteEntity, PaletteLikeEntity } from './entities/palette.entity';
import paletteConfig from './palette.config';
import { PaletteRepository } from './repositories/palette.repository';
import { PaletteService } from './services/palette.service';
import { PaletteValidation } from './validations/palette.validation';
import { PaletteLikeRepository } from './repositories/palette-like.repository';
import { PaletteLikeService } from './services/palette-like.service';
import type { AIService } from '~/layers/ai/server/services/ai.service';

export interface PaletteModule {
  service: PaletteService
  validation: PaletteValidation
  like: {
    service: PaletteLikeService
  }
  setup: () => Promise<void>
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

  const likeCollection = db.collection<PaletteLikeEntity>(paletteConfig.likesCollectionName);
  const likeRepository = new PaletteLikeRepository(likeCollection);
  const likeService = new PaletteLikeService(likeRepository);

  const collection = db.collection<PaletteEntity>(paletteConfig.collectionName);
  const repository = new PaletteRepository(collection);
  const service = new PaletteService(repository, aiService, likeService);

  const validation = new PaletteValidation();

  return {
    service,
    validation,
    like: {
      service: likeService
    },
    setup: async () => {
      await Promise.all([
        repository.setup(),
        likeRepository.setup()
      ]);
    }
  };
}

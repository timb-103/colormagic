import { type Db } from 'mongodb';
import type { Logger } from 'pino';
import type { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import userConfig from './user.config';
import { UserRepository } from './repositories/user.repository';

export interface UserModule {
  service: UserService
}

/**
 * - loaded from main server initializer util in `~/server/utils/initialize-server.ts`
 * - can be used in api globally eg. `modules.notification.service.getById()`
 */

export function getUserModule(
  db: Db,
  logger: Logger
): UserModule {
  logger.info('initializing user module');

  const collection = db.collection<UserEntity>(userConfig.collectionName);
  const repository = new UserRepository(collection);
  const service = new UserService(repository);

  return {
    service
  };
}

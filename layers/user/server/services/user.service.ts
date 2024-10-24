import type { UserRepository } from '../repositories/user.repository';
import type { UserDto } from '../dtos/user.dto';
import { mapUserEntityToDto } from '../helpers/user.helper';

export class UserService {
  constructor(
    private readonly repository: UserRepository
  ) {}

  public async getById(id: string): Promise<UserDto | null> {
    const entity = await this.repository.getById(id);

    return entity !== null ? mapUserEntityToDto(entity) : null;
  }

  public async getByEmail(email: string): Promise<UserDto | null> {
    const entity = await this.repository.getByEmail(email);

    return entity !== null ? mapUserEntityToDto(entity) : null;
  }

  public async getByGoogleId(googleId: string): Promise<UserDto | null> {
    const entity = await this.repository.getByGoogleId(googleId);

    return entity !== null ? mapUserEntityToDto(entity) : null;
  }

  public async setLastLoginToNow(id: string): Promise<UserDto> {
    const entity = await this.repository.updateById(id, {
      lastLoginAt: new Date()
    });

    return mapUserEntityToDto(entity);
  }

  public async linkGoogleIdToUser(userId: string, googleId: string): Promise<UserDto> {
    const entity = await this.repository.updateById(userId, {
      googleId
    });

    return mapUserEntityToDto(entity);
  }

  public async createByGoogle(googleId: string, email: string): Promise<UserDto> {
    const [foundByGoogleId, foundByEmail] = await Promise.all([
      this.getByGoogleId(googleId),
      this.getByEmail(email)
    ]);

    if (foundByGoogleId !== null) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Already exists.'
      });
    }

    /** @description link to existing account */
    if (foundByEmail !== null) {
      return await this.linkGoogleIdToUser(foundByEmail.id, googleId);
    }

    const entity = await this.repository.create({
      email: email.toLowerCase(),
      googleId,
      createdAt: new Date(),
      lastLoginAt: new Date()
    });

    return mapUserEntityToDto(entity);
  }
}

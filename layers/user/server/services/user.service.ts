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

  public async getByGoogleId(googleId: string): Promise<UserDto | null> {
    const entity = await this.repository.getByGoogleId(googleId);

    return entity !== null ? mapUserEntityToDto(entity) : null;
  }

  public async createByGoogle(googleId: string, email: string): Promise<UserDto> {
    const found = await this.getByGoogleId(googleId);
    if (found !== null) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Already exists.'
      });
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

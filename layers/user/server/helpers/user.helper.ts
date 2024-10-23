import type { UserDto } from '../dtos/user.dto';
import type { UserEntity } from '../entities/user.entity';

export function mapUserEntityToDto(entity: UserEntity): UserDto {
  return {
    id: entity._id.toHexString(),
    email: entity.email,
    name: entity.name
  };
}

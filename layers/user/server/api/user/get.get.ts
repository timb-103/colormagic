import type { UserDto } from '../../dtos/user.dto';

export default defineEventHandler(async (event): Promise<UserDto> => {
  const { userId } = await modules.auth.service.verify(event);

  const response = await modules.user.service.getById(userId);
  if (response === null) {
    throw createError({ statusCode: 404 });
  }

  return response;
});

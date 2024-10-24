import type { UserDto } from '~/layers/user/server/dtos/user.dto';

export default defineEventHandler(async (event): Promise<UserDto> => {
  const body = await modules.google.validation.getAuthInputBody(event);

  const response = await modules.auth.service.loginWithGoogle(event, body.code);

  return response;
});

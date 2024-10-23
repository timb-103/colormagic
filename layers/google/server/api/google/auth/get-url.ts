import type { GoogleAuthUrlDto } from '../../../dtos/google.dto';

export default defineEventHandler(async (event): Promise<GoogleAuthUrlDto> => {
  const body = await modules.google.validation.getAuthUrlInputBody(event);

  const response = await modules.google.service.getAuthUrl(body.state);

  return {
    url: response
  };
});

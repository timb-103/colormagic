import type { PaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteDto> => {
  const body = await modules.palette.validation.getCreateInputBody(event);
  const response = await modules.palette.service.create(body.prompt, body.colors);

  return response;
});

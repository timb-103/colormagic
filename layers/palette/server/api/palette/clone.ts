import type { PaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteDto> => {
  const body = await modules.palette.validation.getCloneInputBody(event);
  const response = await modules.palette.service.cloneById(body.id, body.colors);

  return response;
});

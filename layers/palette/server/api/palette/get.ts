import type { PaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteDto> => {
  const body = await modules.palette.validation.getInputBody(event);
  const response = await modules.palette.service.getById(body.id);

  return response;
});

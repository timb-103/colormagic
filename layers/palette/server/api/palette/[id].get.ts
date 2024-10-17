import type { PaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteDto> => {
  const params = await modules.palette.validation.getInputParams(event);
  const response = await modules.palette.service.getById(params.id);

  return response;
});

import type { PaletteDto } from '../../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteDto> => {
  const query = await modules.palette.validation.getCloneInputQuery(event);
  const params = await modules.palette.validation.getCloneInputParams(event);

  const response = await modules.palette.service.cloneById(params.id, query.colors);

  return response;
});

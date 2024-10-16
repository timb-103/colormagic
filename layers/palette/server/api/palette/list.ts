import type { PaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteDto[]> => {
  const body = await modules.palette.validation.getListInputBody(event);
  const response = await modules.palette.service.list(body.page, body.size);

  return response;
});

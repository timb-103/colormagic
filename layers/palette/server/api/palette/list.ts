import type { ListPaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<ListPaletteDto> => {
  const body = await modules.palette.validation.getListInputBody(event);
  const response = await modules.palette.service.list(body.page, body.size, body.filter);

  return response;
});

import type { ListPaletteDto } from '../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<ListPaletteDto> => {
  const body = await modules.palette.validation.getListByIdsInputBody(event);
  const response = await modules.palette.service.listByIds(body.paletteIds);

  return {
    items: response,
    count: response.length
  };
});

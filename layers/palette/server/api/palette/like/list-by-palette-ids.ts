import type { ListPaletteLikesDto } from '../../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<ListPaletteLikesDto> => {
  const { userId } = await modules.auth.service.verify(event);

  const body = await modules.palette.validation.getListLikesByIdsInputBody(event);
  const response = await modules.palette.like.service.listByPaletteIds(userId, body.paletteIds);

  return {
    items: response.map(v => v.paletteId)
  };
});

import type { ListPaletteLikesDto } from '../../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<ListPaletteLikesDto> => {
  const { userId } = await modules.auth.service.verify(event);

  const body = await modules.palette.validation.getListLikesInputBody(event);
  const response = await modules.palette.like.service.listByUserId(userId, body.page, body.size);

  return {
    items: response.map(v => v.paletteId)
  };
});

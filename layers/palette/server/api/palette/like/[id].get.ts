import type { PaletteLikeDto } from '../../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteLikeDto> => {
  const { userId } = await modules.auth.service.verify(event);

  const params = await modules.palette.validation.getLikeInputParams(event);

  const response = await modules.palette.like.service.getByPaletteId(userId, params.id);
  if (response === null) {
    throw createError({ statusCode: 404 });
  }

  return response;
});

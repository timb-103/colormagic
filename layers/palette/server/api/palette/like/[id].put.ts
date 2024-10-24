import type { PaletteLikeDto } from '../../../dtos/palette.dto';

export default defineEventHandler(async (event): Promise<PaletteLikeDto> => {
  const { userId } = await modules.auth.service.verify(event);

  const params = await modules.palette.validation.getCreateLikeInputParams(event);
  const response = await modules.palette.like.service.create(userId, params.id);

  return response;
});

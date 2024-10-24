export default defineEventHandler(async (event) => {
  const { userId } = await modules.auth.service.verify(event);

  const params = await modules.palette.validation.getDeleteLikeInputParams(event);

  await modules.palette.like.service.deleteByPaletteId(userId, params.id);

  setResponseStatus(event, 201);
});

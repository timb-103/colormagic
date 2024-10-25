export default defineEventHandler(async (event) => {
  const { userId } = await modules.auth.service.verify(event);

  const params = await modules.palette.validation.getCreateLikeInputParams(event);

  await modules.palette.service.likeById(userId, params.id);

  setResponseStatus(event, 201);
});

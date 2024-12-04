export default defineEventHandler(async (event) => {
  const query = await modules.og.validation.getThumbnailInputQuery(event);

  const response = await modules.og.service.generateSquareThumbnail(
    query.colors.split(':')
  );

  setResponseHeader(event, 'Content-Type', 'image/png');

  return response;
});

export default defineEventHandler(async (event) => {
  const query = await modules.image.validation.getInputQuery(event);

  const response = await modules.image.service.generateSquareThumbnail(
    query.colors.split(':')
  );

  setResponseHeader(event, 'Content-Type', 'image/png');

  return response;
});

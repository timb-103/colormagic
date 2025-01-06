export default defineEventHandler(async (event) => {
  const params = await modules.image.validation.getTagParams(event);

  const response = await modules.image.service.generateByTag(
    params.tag.toLowerCase()
  );

  setResponseHeader(event, 'Content-Type', 'image/png');

  return response;
});

export default defineEventHandler(async (event) => {
  const query = await modules.og.validation.getTagQuery(event);

  const response = await modules.og.service.generateGridImageFromTags(
    query.tag.toLowerCase(),
    query.text
  );

  setResponseHeader(event, 'Content-Type', 'image/png');

  return response;
});

export default defineEventHandler(async (event) => {
  const params = await modules.image.validation.getByIdParams(event);
  const query = await modules.image.validation.getByIdQuery(event);

  const options = query?.width !== undefined && query?.height !== undefined
    ? {
        width: parseInt(query.width),
        height: parseInt(query.height)
      }
    : undefined;

  const response = await modules.image.service.generateById(params.id, options);

  setResponseHeader(event, 'Content-Type', 'image/png');

  return response;
});

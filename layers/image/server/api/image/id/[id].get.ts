export default defineEventHandler(async (event) => {
  const params = await modules.image.validation.getByIdParams(event);

  const response = await modules.image.service.generateById(params.id);

  setResponseHeader(event, 'Content-Type', 'image/png');

  return response;
});

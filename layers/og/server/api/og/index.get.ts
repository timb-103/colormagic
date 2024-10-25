export default defineEventHandler(async (event) => {
  const query = await modules.og.validation.getInputQuery(event);

  const response = await modules.og.service.generateImage(
    query.colors.split(':'),
    query.text
  );

  setResponseHeader(event, 'Content-Type', 'image/png');

  return response;
});

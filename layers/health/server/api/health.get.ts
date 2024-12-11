export default defineEventHandler(async () => {
  const response = await modules.health.service.ping();

  if (response.ok !== 1) {
    throw createError({
      statusCode: 503,
      statusMessage: 'service unhealthy'
    });
  }

  return response;
});

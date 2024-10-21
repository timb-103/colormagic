export default defineEventHandler(async (event): Promise<void> => {
  const body = await modules.feedback.validation.getCreateInputBody(event);

  await modules.feedback.service.create(body.email, body.feedback);

  setResponseStatus(event, 201);
});

import { getRateLimitPayload } from '../utils/rate-limit';

/**
 * Function that checks a user rate limit.
 *
 * Only works on API routes, eg: /api/hello
 */
export default defineEventHandler(async (event) => {
  const payload = getRateLimitPayload(event);

  // route does not have rate limiting configured
  if (payload === false) {
    return;
  }

  event.context.payload = payload;
  event.context.body = await readBody(event);

  const { limited, current, limit, secondsUntilReset } = payload;

  setHeader(event, 'x-ratelimit-current', current);
  setHeader(event, 'x-ratelimit-limit', limit);
  setHeader(event, 'x-ratelimit-reset', secondsUntilReset);

  if (limited) {
    throw createError({
      statusCode: 429,
      statusMessage: `Too many requests. Please try again in ${String(secondsUntilReset)} seconds.`
    });
  }
});

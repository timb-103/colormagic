import { type H3Event } from 'h3';

interface RateLimitResponse {
  limited: boolean
  limit: number
  current: number
  secondsUntilReset: number
  ip: string | undefined
}

// store rate limits for each IP address
export type RateLimit = Record<string, {
  firstRequestTime: number
  requests: number
} | undefined>;
const rateLimit: RateLimit = {};

/**
 * This function checks whether a request from a given IP address should be rate limited
 *
 * If rate limited it will return the seconds until they can try again.
 *
 * @param event
 */
export function getRateLimitPayload(event: H3Event): false | RateLimitResponse {
  const path = getRequestURL(event).pathname;
  if (!path.includes('/api/') || path.includes('_nuxt_icon')) {
    return false;
  }

  const maxRequests = useRuntimeConfig().rateLimit.maxRequests;
  const intervalSeconds = useRuntimeConfig().rateLimit.intervalSeconds;

  const intervalMs = intervalSeconds * 1000;
  const ip = getRequestIP(event, { xForwardedFor: true });

  if (ip === undefined) {
    return false;
  }

  // mark any IPs that haven't been used since interval as undefined to keep object small
  const currentTime = Date.now();
  Object.keys(rateLimit).forEach((key: keyof RateLimit) => {
    const item = rateLimit[key];
    if (item !== undefined) {
      const timeSinceLastRequest = currentTime - item.firstRequestTime;
      if (timeSinceLastRequest >= intervalMs) {
        rateLimit[key] = undefined;
      }
    }
  });

  // add a rate limit object, or set to existing
  if (rateLimit[ip] === undefined) {
    rateLimit[ip] = {
      firstRequestTime: currentTime,
      requests: 0
    };
  }

  const ipRateLimit = rateLimit[ip];
  if (ipRateLimit === undefined) {
    return false;
  }

  const timeSinceFirstRequest = currentTime - ipRateLimit.firstRequestTime;
  const secondsUntilReset = Math.ceil((intervalMs - timeSinceFirstRequest) / 1000);
  const limited = ipRateLimit.requests >= maxRequests;

  // increment the requests counter
  if (!limited) {
    ipRateLimit.requests++;
  }

  return { limited, limit: maxRequests, current: ipRateLimit.requests, secondsUntilReset, ip };
}

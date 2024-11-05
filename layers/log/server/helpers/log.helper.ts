import { type H3Event, type H3Error } from 'h3';
import { type Log } from '../../types';

export function isAPIRequest(event: H3Event): boolean {
  return event.path.includes('/api/');
}

export function mapEventToLog(event: H3Event, err?: H3Error | null | any): Log {
  return {
    err,
    req: {
      method: event.node.req.method,
      url: event.node.req.url,
      rateLimitPayload: event.context.payload,
      body: event.context.body,
      ip: getRequestIP(event),
      userAgent: getRequestHeader(event, 'user-agent')
    },
    res: {
      statusCode: err?.statusCode ?? event.node.res.statusCode
    },
    responseTime: Date.now() - event.context.responseTime
  };
}

import { type H3Error } from 'h3';

export interface Log {
  err: H3Error | null | undefined
  req: {
    method: string | undefined
    url: string | undefined
    rateLimitPayload: unknown
    body: unknown
    ip?: string
    userAgent?: string
  }
  res: {
    statusCode: number
  }
  responseTime: number
}

import { Middleware } from '@application/protocols/http'
import { ManyRequestsError } from '@common/errors'
import { RateLimitOptions, RateLimitProps } from '@common/interfaces'
import { NextFunction, Request, Response } from 'express'

export class RateLimiter implements Middleware {
  private requests: Map<string, RateLimitProps> = new Map()
  private options: RateLimitOptions

  constructor(options: RateLimitOptions) {
    this.options = options
  }

  public handle(
    request: Request,
    _response: Response,
    next: NextFunction
  ): void {
    const { windowMs, maxRequests } = this.options
    const clientIp = request.ip as string
    const currentTime = Date.now()
    const clientData = this.requests.get(clientIp)

    if (clientData) {
      if (currentTime - clientData.startTime < windowMs) {
        if (clientData.requestCount >= maxRequests) {
          new ManyRequestsError()
          return
        } else {
          clientData.requestCount += 1
        }
      } else {
        clientData.startTime = currentTime
        clientData.requestCount = 1
      }
    } else {
      this.requests.set(clientIp, { requestCount: 1, startTime: currentTime })
    }

    this.expiredRequestsClear(currentTime, windowMs)

    next()
  }

  private expiredRequestsClear(currentTime: number, windowMs: number): void {
    this.requests.forEach((data, ip) => {
      if (currentTime - data.startTime > windowMs) {
        this.requests.delete(ip)
      }
    })
  }
}

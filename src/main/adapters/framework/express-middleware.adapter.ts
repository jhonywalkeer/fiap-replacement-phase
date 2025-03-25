import { Middleware } from '@application/protocols/http'
import { HttpException } from '@common/errors'
import { NextFunction, Request, Response } from 'express'

export const ExpressMiddlewareAdapter = (middleware: Middleware) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    return Promise.resolve(middleware.handle(request, _response, next))
      .then(() => {
        return next()
      })
      .catch((error: HttpException) => {
        return next(error)
      })
  }
}

import { Controller } from '@application/protocols/http'
import { HttpException } from '@common/errors'
import { NextFunction, Request, Response } from 'express'

export const ExpressRouteAdapter = <T>(controller: Controller<T>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      controller.handle({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers
      })
    )
      .then((controllerResponse) => {
        response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body)
        return next()
      })
      .catch((error: HttpException) => {
        return next(error)
      })
  }
}

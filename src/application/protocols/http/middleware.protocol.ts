import { NextFunction, Response } from 'express'

export interface Middleware {
  handle(request: any, response: Response, next: NextFunction): any
}

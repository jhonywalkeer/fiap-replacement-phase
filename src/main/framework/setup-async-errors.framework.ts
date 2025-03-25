import { StatusCode, Check, ErrorName, ErrorMessage } from '@common/enums'
import { HttpException } from '@common/errors'
import { Logger } from '@infrastructure/logging'
import { Express } from 'express'
import { NextFunction, Request, Response } from 'express'

export const SetupAsyncErrors = (framework: Express): void => {
  framework.use(
    (
      error: unknown,
      _request: Request,
      response: Response,
      next: NextFunction
    ) => {
      if (!error) {
        return next()
      }

      if (+process.env.DEBUG! === Check.True) {
        Logger.error(error)
      }

      if (error instanceof HttpException) {
        return response.status(error.statusCode).json({
          statusCode: error.statusCode,
          error: error.name,
          message: error.message ?? error.messages
        })
      }

      return response.status(StatusCode.InternalServer).json({
        statusCode: StatusCode.InternalServer,
        error: ErrorName.InternalError,
        message: ErrorMessage.SomethingWrong
      })
    }
  )
}

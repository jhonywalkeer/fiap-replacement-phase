import { SetupAsyncErrors } from './setup-async-errors.framework'
import { StatusCode, Check, ErrorName, ErrorMessage } from '@common/enums'
import { HttpException } from '@common/errors'
import { Logger } from '@infrastructure/logging'
import { Express, Request, Response, NextFunction } from 'express'

describe('[Framework] Setup Async Errors', () => {
  let app: Express
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    app = {
      use: jest.fn()
    } as unknown as Express
    req = {} as Request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response
    next = jest.fn()
  })

  it('should call next if there is no error', () => {
    SetupAsyncErrors(app)
    const middleware = (app.use as jest.Mock).mock.calls[0][0]
    middleware(null, req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('should log the error if DEBUG is true', () => {
    process.env.DEBUG = Check.True.toString()
    const error = new Error('Test error')
    jest.spyOn(Logger, 'error').mockImplementation(jest.fn())

    SetupAsyncErrors(app)
    const middleware = (app.use as jest.Mock).mock.calls[0][0]
    middleware(error, req, res, next)

    expect(Logger.error).toHaveBeenCalledWith(error)
  })

  it('should return HttpException error response', () => {
    const error = new HttpException()

    SetupAsyncErrors(app)
    const middleware = (app.use as jest.Mock).mock.calls[0][0]
    middleware(error, req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCode.InternalServer)
    expect(res.json).toHaveBeenCalledWith({
      statusCode: StatusCode.InternalServer,
      error: error.name,
      message: error.message
    })
  })

  it('should return internal server error response for unknown errors', () => {
    const error = new Error('Unknown error')

    SetupAsyncErrors(app)
    const middleware = (app.use as jest.Mock).mock.calls[0][0]
    middleware(error, req, res, next)

    expect(res.status).toHaveBeenCalledWith(StatusCode.InternalServer)
    expect(res.json).toHaveBeenCalledWith({
      statusCode: StatusCode.InternalServer,
      error: ErrorName.InternalError,
      message: ErrorMessage.SomethingWrong
    })
  })
})

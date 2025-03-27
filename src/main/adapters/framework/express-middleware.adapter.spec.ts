import { ExpressMiddlewareAdapter } from './express-middleware.adapter'
import { Middleware } from '@application/protocols/http'
import { HttpException } from '@common/errors'
import { Request, Response, NextFunction } from 'express'

describe('[Framework] Express Middleware Adapter', () => {
  let mockMiddleware: Middleware
  let mockRequest: Request
  let mockResponse: Response
  let mockNext: NextFunction

  beforeEach(() => {
    mockMiddleware = {
      handle: jest.fn()
    }
    mockRequest = {} as Request
    mockResponse = {} as Response
    mockNext = jest.fn()
  })

  it('should call middleware handle with the correct parameters', async () => {
    const adapter = ExpressMiddlewareAdapter(mockMiddleware)
    await adapter(mockRequest, mockResponse, mockNext)
    expect(mockMiddleware.handle).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      mockNext
    )
  })

  it('should call next without error if middleware handle resolves', async () => {
    const adapter = ExpressMiddlewareAdapter(mockMiddleware)
    await adapter(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalledWith()
  })

  it('should call next with error if middleware handle rejects with HttpException', async () => {
    const error = new HttpException()
    jest.spyOn(mockMiddleware, 'handle').mockRejectedValueOnce(error)
    const adapter = ExpressMiddlewareAdapter(mockMiddleware)
    await adapter(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalledWith(error)
  })

  it('should call next with error if middleware handle rejects with a non-HttpException error', async () => {
    const error = new Error('Test error')
    jest.spyOn(mockMiddleware, 'handle').mockRejectedValueOnce(error)
    const adapter = ExpressMiddlewareAdapter(mockMiddleware)
    await adapter(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalledWith(error)
  })
})

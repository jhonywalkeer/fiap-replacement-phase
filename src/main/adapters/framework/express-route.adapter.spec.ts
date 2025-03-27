import { ExpressRouteAdapter } from './express-route.adapter'
import { Controller } from '@application/protocols/http'
import { Request, Response, NextFunction } from 'express'
import { HttpException } from '@common/errors'
import { StatusCode } from '@common/enums'

describe('[Framework] Express Route Adapter', () => {
  const makeControllerStub = (): Controller<any> => ({
    handle: jest.fn(async () => ({
      statusCode: StatusCode.Sucess,
      body: { success: true }
    }))
  })

  const makeRequest = (): Partial<Request> => ({
    query: { test: 'any_queryparam' },
    params: { id: 'any_param' },
    body: { key: 'any_value' },
    headers: { authorization: 'Bearer token' }
  })

  const makeResponse = (): Partial<Response> => {
    const res: Partial<Response> = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  const makeNextFunction = (): NextFunction => jest.fn()

  it('should call controller handle with correct parameters', async () => {
    const controllerStub = makeControllerStub()
    const request = makeRequest() as Request
    const response = makeResponse() as Response
    const next = makeNextFunction()
    const adapter = ExpressRouteAdapter(controllerStub)

    await adapter(request, response, next)

    expect(controllerStub.handle).toHaveBeenCalledWith({
      query: request.query,
      params: request.params,
      body: request.body,
      headers: request.headers
    })
  })

  it('should respond with the correct status code and body', async () => {
    const controllerStub = makeControllerStub()
    const request = makeRequest() as Request
    const response = makeResponse() as Response
    const next = makeNextFunction()
    const adapter = ExpressRouteAdapter(controllerStub)

    await adapter(request, response, next)

    expect(response.status).toHaveBeenCalledWith(StatusCode.Sucess)
    expect(response.json).toHaveBeenCalledWith({ success: true })
  })

  it('should call next with error if controller throws', async () => {
    const controllerStub = makeControllerStub()
    jest
      .spyOn(controllerStub, 'handle')
      .mockRejectedValueOnce(new HttpException())
    const request = makeRequest() as Request
    const response = makeResponse() as Response
    const next = makeNextFunction()
    const adapter = ExpressRouteAdapter(controllerStub)

    await adapter(request, response, next)

    expect(next).toHaveBeenCalledWith(expect.any(HttpException))
  })

  it('should call next after successful response', async () => {
    const controllerStub = makeControllerStub()
    const request = makeRequest() as Request
    const response = makeResponse() as Response
    const next = makeNextFunction()
    const adapter = ExpressRouteAdapter(controllerStub)

    await adapter(request, response, next)

    expect(next).toHaveBeenCalled()
  })
})

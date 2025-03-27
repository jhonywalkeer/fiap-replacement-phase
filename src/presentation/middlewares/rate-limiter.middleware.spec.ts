import { RateLimitOptions } from '@common/interfaces'
import { RateLimitParamsMock } from '@mocks/rate-limit-middleware.mock'
import { RateLimiter } from '@presentation/middlewares'

describe('[Middlewares] RateLimiter', () => {
  const makeSut = (options: RateLimitOptions): RateLimiter =>
    new RateLimiter(options)

  const sut = makeSut(RateLimitParamsMock)

  it('should reset clientData when the request is outside the rate limit window', () => {
    const req = { ip: '::1' } as any
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any
    const next = jest.fn()

    const initialTime = Date.now()
    jest.spyOn(global.Date, 'now').mockImplementation(() => initialTime)

    sut.handle(req, res, next)
    sut.handle(req, res, next)
    expect(next).toHaveBeenCalledTimes(2)

    jest.spyOn(global.Date, 'now').mockImplementation(() => initialTime + 2000)

    sut.handle(req, res, next)
    expect(next).toHaveBeenCalledTimes(3)

    jest.clearAllMocks()
  })

  it('should delete expired requests from the map', () => {
    const req = { ip: '::1' } as any
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any
    const next = jest.fn()

    const initialTime = Date.now()
    jest.spyOn(global.Date, 'now').mockImplementation(() => initialTime)

    sut.handle(req, res, next)
    expect(sut['requests'].has('::1')).toBe(true)

    jest.spyOn(global.Date, 'now').mockImplementation(() => initialTime + 2000)

    sut.handle(req, res, next)
    expect(sut['requests'].has('::2')).toBe(false)

    jest.clearAllMocks()
  })
})

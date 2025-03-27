import { ErrorMessage, ErrorName, StatusCode } from '@common/enums'
import { ManyRequestsError } from '@common/errors'

describe('[Errors] Many Requests Error', () => {
  it('should have the correct status code', () => {
    const error = new ManyRequestsError()
    expect(error.statusCode).toBe(StatusCode.TooManyRequests)
  })

  it('should have the correct error name', () => {
    const error = new ManyRequestsError()
    expect(error.name).toBe(ErrorName.InternalError)
  })

  it('should have the correct error message', () => {
    const error = new ManyRequestsError()
    expect(error.message).toBe(ErrorMessage.RateLimit)
  })
})

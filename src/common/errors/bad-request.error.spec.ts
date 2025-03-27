import { ErrorName, StatusCode } from '@common/enums'
import { BadRequestError } from './bad-request.error'

describe('[Errors] Bad Requests Error', () => {
  const identifier = 'Campo de exemplo esta incorreto'

  it('should have the correct status code', () => {
    const error = new BadRequestError(identifier)
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct error name', () => {
    const error = new BadRequestError(identifier)
    expect(error.name).toBe(ErrorName.BadRequest)
  })

  it('should have the correct error message', () => {
    const error = new BadRequestError(identifier)
    expect(error.message).toBe(identifier)
  })
})

import { UnderAgeError } from '@common/errors'
import { StatusCode, ErrorName, ErrorMessage } from '@common/enums'

describe('[Errors] Under Age Error', () => {
  it('should have the correct status code', () => {
    const error = new UnderAgeError()
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct error name', () => {
    const error = new UnderAgeError()
    expect(error.name).toBe(ErrorName.BadRequest)
  })

  it('should have the correct error message', () => {
    const error = new UnderAgeError()
    expect(error.message).toBe(ErrorMessage.UnderAge)
  })
})

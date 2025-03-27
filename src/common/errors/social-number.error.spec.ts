import { SocialNumberError } from '@common/errors'
import { StatusCode, ErrorName, ErrorMessage } from '@common/enums'

describe('[Errors] Social Number Error', () => {
  it('should have the correct status code', () => {
    const error = new SocialNumberError()
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct error name', () => {
    const error = new SocialNumberError()
    expect(error.name).toBe(ErrorName.BadRequest)
  })

  it('should have the correct error message', () => {
    const error = new SocialNumberError()
    expect(error.message).toBe(ErrorMessage.SocialNumber)
  })
})

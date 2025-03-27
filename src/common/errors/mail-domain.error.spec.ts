import { ErrorMessage, ErrorName, StatusCode } from '@common/enums'
import { MailDomainError } from '@common/errors'

describe('[Errors] Mail Domain Error', () => {
  it('should have the correct status code', () => {
    const error = new MailDomainError()
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct error name', () => {
    const error = new MailDomainError()
    expect(error.name).toBe(ErrorName.BadRequest)
  })

  it('should have the correct error message', () => {
    const error = new MailDomainError()
    expect(error.message).toBe(ErrorMessage.MailDomain)
  })
})

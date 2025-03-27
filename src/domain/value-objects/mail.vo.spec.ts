import { Mail } from './mail.vo'
import { MailDomainError } from '@common/errors'
import { Pattern } from '@common/constants'

describe('[Value Objects] Mail Value Object', () => {
  it('should create a valid Mail instance', () => {
    const validEmail = `test${Pattern.MailsDomains[0]}`
    const mail = new Mail(validEmail)
    expect(mail.getValue()).toBe(validEmail)
  })

  it('should throw an error if email does not match valid domains', () => {
    const invalidEmail = 'test@invalid.com'
    expect(() => new Mail(invalidEmail)).toThrow(MailDomainError)
  })

  it('should throw an error if email does not include the required pattern', () => {
    const invalidEmail = 'invalid-email'
    expect(() => new Mail(invalidEmail)).toThrow(MailDomainError)
  })

  it('should throw an error if email is null or undefined', () => {
    expect(() => new Mail(null as unknown as string)).toThrow(MailDomainError)
    expect(() => new Mail(undefined as unknown as string)).toThrow(
      MailDomainError
    )
  })
})

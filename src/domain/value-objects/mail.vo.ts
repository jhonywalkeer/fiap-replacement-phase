import { Pattern } from '@common/constants'
import { MailDomainError } from '@common/errors'

export class Mail {
  private readonly value: string

  constructor(value: string) {
    this.value = Mail.validate(value)
  }

  private static validate(value: string): string {
    const isEmail = value?.includes(Pattern.MailValid)
    const isValid = Pattern.MailsDomains.some((email: string) =>
      value?.toLowerCase().endsWith(email)
    )

    if (!isValid || !isEmail) {
      throw new MailDomainError()
    }
    return value
  }

  public getValue(): string {
    return this.value
  }
}

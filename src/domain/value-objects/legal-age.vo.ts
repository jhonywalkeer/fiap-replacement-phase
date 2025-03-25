import { Pattern } from '@common/constants'
import { UnderAgeError } from '@common/errors'

export class LegalAge {
  private readonly value: Date

  constructor(value: Date) {
    this.value = LegalAge.validate(value)
  }

  private static validate(value: Date): Date {
    const currentDate: Date = new Date()
    const legalAge: Date = new Date(
      currentDate.getFullYear() - Pattern.LegalAge,
      currentDate.getMonth(),
      currentDate.getDate()
    )
    const isValid = value < legalAge

    if (!isValid) {
      throw new UnderAgeError()
    }
    return value
  }

  public getValue(): Date {
    return this.value
  }
}

import { EmptyFiller } from '@common/constants'
import { SocialNumberError } from '@common/errors'
import { SocialNumberCalculator } from '@common/utils/calculators'

export class SocialNumber {
  private readonly value: string

  constructor(value: string) {
    this.value = SocialNumber.validate(value)
  }

  private static validate(value: string): string {
    const removeSpecialCharacters: string = value
      .replace(/\./g, EmptyFiller)
      .replace(/-/g, EmptyFiller)
    const size: boolean = removeSpecialCharacters.length === 11
    const isAllEquals: boolean = removeSpecialCharacters
      .split('')
      .every((char) => char === removeSpecialCharacters[0])

    if (!removeSpecialCharacters || !size || isAllEquals) {
      throw new SocialNumberError()
    }

    const base: string = removeSpecialCharacters.slice(0, 9)
    const firstDigit: number = SocialNumberCalculator(base)
    const secondDigit: number = SocialNumberCalculator(base + firstDigit)
    const isValid: boolean =
      Number(removeSpecialCharacters[9]) === firstDigit &&
      Number(removeSpecialCharacters[10]) === secondDigit

    if (!isValid) {
      throw new SocialNumberError()
    }

    return removeSpecialCharacters
  }

  public getValue(): string {
    return this.value
  }
}

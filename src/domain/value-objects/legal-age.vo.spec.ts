import { LegalAge } from './legal-age.vo'
import { UnderAgeError } from '@common/errors'

describe('[Value Objects] Legal Age', () => {
  it('should create a legal age instance for a valid date', () => {
    const validDate = new Date(new Date().getFullYear() - 20, 0, 1)
    const legalAge = new LegalAge(validDate)
    expect(legalAge.getValue()).toEqual(validDate)
  })

  it('should throw Under Age Error for an invalid date', () => {
    const invalidDate = new Date(new Date().getFullYear() - 10, 0, 1)
    expect(() => new LegalAge(invalidDate)).toThrow(UnderAgeError)
  })

  it('should return the correct value from get Value', () => {
    const validDate = new Date(new Date().getFullYear() - 25, 0, 1)
    const legalAge = new LegalAge(validDate)
    expect(legalAge.getValue()).toBe(validDate)
  })
})

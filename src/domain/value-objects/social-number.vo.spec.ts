import { SocialNumber } from './social-number.vo'
import { SocialNumberError } from '@common/errors'

describe('[Value Objects] Social Number', () => {
  it('should create a valid SocialNumber instance', () => {
    const validSocialNumber = '123.456.789-09'
    const socialNumber = new SocialNumber(validSocialNumber)
    expect(socialNumber.getValue()).toBe('12345678909')
  })

  it('should throw an error if the input is empty', () => {
    expect(() => new SocialNumber('')).toThrow(SocialNumberError)
  })

  it('should throw an error if the input contains all equal digits', () => {
    expect(() => new SocialNumber('111.111.111-11')).toThrow(SocialNumberError)
  })

  it('should throw an error if the input has an invalid length', () => {
    expect(() => new SocialNumber('123.456.78')).toThrow(SocialNumberError)
  })

  it('should throw an error if the input has invalid check digits', () => {
    expect(() => new SocialNumber('123.456.789-00')).toThrow(SocialNumberError)
  })

  it('should remove special characters and validate correctly', () => {
    const validSocialNumber = '123.456.789-09'
    const socialNumber = new SocialNumber(validSocialNumber)
    expect(socialNumber.getValue()).toBe('12345678909')
  })
})

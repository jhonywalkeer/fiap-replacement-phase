import { IsFieldOrParamIdentify } from './is-field-or-param.identify'
import { IncorrectType } from '@common/enums'

describe('[Identifier] Is Field Or Param Identify', () => {
  it('should return incorrect type identify param when field or param is IncorrectType.Param', () => {
    const result = IsFieldOrParamIdentify(IncorrectType.Param)
    expect(result).toBe(IncorrectType.Param)
  })

  it('should return incorrect type field when field or param is not IncorrectType.Param', () => {
    const result = IsFieldOrParamIdentify('someOtherValue')
    expect(result).toBe(IncorrectType.Field)
  })

  it('should return incorrect type field when field or param is undefined', () => {
    const result = IsFieldOrParamIdentify(undefined)
    expect(result).toBe(IncorrectType.Field)
  })
})

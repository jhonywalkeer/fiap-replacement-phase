import { IncorrectFieldOrParamTypeError } from '@common/errors'
import { IdentifierDescriptionMock } from '@mocks/common'
import { IsString } from '@presentation/validators'

describe('[Validators] Is String Validator', () => {
  let value: any
  const identifier: string = IdentifierDescriptionMock

  it('should return a string', () => {
    value = '1'
    expect(IsString(value, identifier)).toBe(value)
  })

  it('should throw an error when the value is not a string', () => {
    value = 1
    expect(() => IsString(value, identifier)).toThrow(
      IncorrectFieldOrParamTypeError
    )
  })
})

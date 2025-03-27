import {
  IdentifierDescriptionMock,
  IdentifierInvalidMock,
  IdentifierMock
} from '@mocks/common'
import { IsUUID } from '@presentation/validators'
import { IncorrectFieldOrParamTypeError } from '@common/errors'
import { EmptyFiller } from '@common/constants'

describe('[Validators] Is UUID Validator', () => {
  const validUUID: string = IdentifierMock
  const invalidUUID: string = IdentifierInvalidMock
  const identifier: string = IdentifierDescriptionMock

  it('should return the value if it is a valid UUID', () => {
    expect(IsUUID(validUUID, identifier)).toBe(validUUID)
  })

  it('should throw IncorrectFieldOrParamTypeError if the value is not a valid UUID', () => {
    expect(() => IsUUID(invalidUUID, identifier)).toThrow(
      IncorrectFieldOrParamTypeError
    )
  })

  it('should throw IncorrectFieldOrParamTypeError if the empty value', () => {
    expect(() => IsUUID(EmptyFiller, identifier)).toThrow(
      IncorrectFieldOrParamTypeError
    )
  })
})

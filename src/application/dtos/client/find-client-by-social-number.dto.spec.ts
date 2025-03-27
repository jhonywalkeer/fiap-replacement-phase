import { FindClientBySocialNumberDTO } from '@application/dtos/client'
import { EmptyFiller } from '@common/constants'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import {
  HttpException,
  IncorrectFieldOrParamTypeError,
  SocialNumberError
} from '@common/errors'
import { Field } from '@domain/enums'
import {
  FindClientBySocialNumberMock,
  SocialNumberMock,
  SocialNumberWithSymbolMock
} from '@mocks/client'
import {
  IncorrectFieldOrParamTypeStub,
  SocialNumberStub
} from '@stubs/exceptions'

describe(`[DTO's] Find Client By Social Number DTO`, () => {
  it('should call with the correct values', () => {
    const input: FindClientBySocialNumberDTO = new FindClientBySocialNumberDTO(
      SocialNumberMock
    )

    expect(input).toBeInstanceOf(FindClientBySocialNumberDTO)
    expect(input).toEqual(FindClientBySocialNumberMock)
  })

  it('should call with social number and formatting symbols', () => {
    const input: FindClientBySocialNumberDTO = new FindClientBySocialNumberDTO(
      SocialNumberWithSymbolMock
    )

    expect(input).toBeInstanceOf(FindClientBySocialNumberDTO)
    expect(input).toEqual(FindClientBySocialNumberMock)
  })

  it('should throw an error if id is empty string', () => {
    const httpException: HttpException = SocialNumberStub()

    expect(() => new FindClientBySocialNumberDTO(EmptyFiller)).toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(new SocialNumberError().message)
  })

  it('should throw an error if id is null provided', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Param,
      Field.SocialSecurityNumber
    )
    expect(() => new FindClientBySocialNumberDTO(null as any)).toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(
        IncorrectType.Param,
        Field.SocialSecurityNumber
      ).message
    )
  })

  it('should throw an error if id is undefined provided', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Param,
      Field.SocialSecurityNumber
    )
    expect(() => new FindClientBySocialNumberDTO(undefined as any)).toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(
        IncorrectType.Param,
        Field.SocialSecurityNumber
      ).message
    )
  })
})

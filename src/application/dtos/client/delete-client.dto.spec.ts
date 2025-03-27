import { IdentifierMock } from '@mocks/common'
import { DeleteClientDTO } from '@application/dtos/client'
import { DeleteClientMock } from '@mocks/client'
import {
  HttpException,
  IncorrectFieldOrParamTypeError,
  NotProvidedError
} from '@common/errors'
import {
  IncorrectFieldOrParamTypeStub,
  NotProvidedStub
} from '@stubs/exceptions'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { Field } from '@domain/enums'
import { EmptyFiller } from '@common/constants'

describe(`[DTO's] Delete Client DTO`, () => {
  it('should call with the correct values', () => {
    const input = new DeleteClientDTO(IdentifierMock)

    expect(input).toBeInstanceOf(DeleteClientDTO)
    expect(input.id).toBe(DeleteClientMock.id)
  })

  it('should throw an error if id is invalid expected type', () => {
    const input: number = 1
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Field,
      Field.Id
    )

    expect(() => new DeleteClientDTO(input as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.InvalidParameters)
    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(IncorrectType.Field, Field.Id).message
    )
  })

  it('should throw an error if id is empty string', () => {
    const input: string = EmptyFiller
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )

    expect(() => new DeleteClientDTO(input)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })

  it('should throw an error if id is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )
    expect(() => new DeleteClientDTO(null as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })

  it('should throw an error if id is undefined', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )
    expect(() => new DeleteClientDTO(undefined as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })
})

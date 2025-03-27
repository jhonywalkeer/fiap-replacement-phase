import { IdentifierMock } from '@mocks/common'
import { FindPaymentByIdDTO } from '@application/dtos/payment'
import { FindPaymentByIdMock } from '@mocks/payment'
import { HttpException, NotProvidedError } from '@common/errors'
import { NotProvidedStub } from '@stubs/exceptions'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { Field } from '@domain/enums'
import { EmptyFiller } from '@common/constants'

describe(`[DTO's] Find Payment By Id DTO`, () => {
  it('should call with the correct id', () => {
    const input: FindPaymentByIdDTO = new FindPaymentByIdDTO(IdentifierMock)

    expect(input).toBeInstanceOf(FindPaymentByIdDTO)
    expect(input).toEqual(FindPaymentByIdMock)
  })

  it('should throw an error if id is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )
    expect(() => new FindPaymentByIdDTO(EmptyFiller)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })

  it('should throw an error if id is null provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )
    expect(() => new FindPaymentByIdDTO(null as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })

  it('should throw an error if id is undefined provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )
    expect(() => new FindPaymentByIdDTO(undefined as any)).toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })
})

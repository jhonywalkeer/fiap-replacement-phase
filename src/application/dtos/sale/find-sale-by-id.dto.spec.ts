import { FindSaleByIdDTO } from '@application/dtos/sale'
import { EmptyFiller } from '@common/constants'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { HttpException, NotProvidedError } from '@common/errors'
import { Field } from '@domain/enums'
import { IdentifierMock } from '@mocks/common'
import { FindSaleByIdMock } from '@mocks/sale'
import { NotProvidedStub } from '@stubs/exceptions'

describe(`[DTO's] Find Sale By Id DTO`, () => {
  it('should call with the correct id', () => {
    const input: FindSaleByIdDTO = new FindSaleByIdDTO(IdentifierMock)

    expect(input).toBeInstanceOf(FindSaleByIdDTO)
    expect(input).toEqual(FindSaleByIdMock)
  })

  it('should throw an error if id is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )
    expect(() => new FindSaleByIdDTO(EmptyFiller)).toThrow(httpException)
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
    expect(() => new FindSaleByIdDTO(null as any)).toThrow(httpException)
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
    expect(() => new FindSaleByIdDTO(undefined as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })
})

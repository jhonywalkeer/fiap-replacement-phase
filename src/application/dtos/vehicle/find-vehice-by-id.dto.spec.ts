import { FindVehicleByIdDTO } from '@application/dtos/vehicle'
import { EmptyFiller } from '@common/constants'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { HttpException, NotProvidedError } from '@common/errors'
import { Field } from '@domain/enums'
import { IdentifierMock } from '@mocks/common'
import { FindVehicleByIdMock } from '@mocks/vehicle'
import { NotProvidedStub } from '@stubs/exceptions'

describe(`[DTO's] Find Vehicle By Id DTO`, () => {
  it('should call with the correct id', () => {
    const input: FindVehicleByIdDTO = new FindVehicleByIdDTO(IdentifierMock)

    expect(input).toBeInstanceOf(FindVehicleByIdDTO)
    expect(input).toEqual(FindVehicleByIdMock)
  })

  it('should throw an error if id is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )
    expect(() => new FindVehicleByIdDTO(EmptyFiller)).toThrow(httpException)
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
    expect(() => new FindVehicleByIdDTO(null as any)).toThrow(httpException)
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
    expect(() => new FindVehicleByIdDTO(undefined as any)).toThrow(
      httpException
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })
})

import { DeleteVehicleDTO } from '@application/dtos/vehicle'
import { EmptyFiller } from '@common/constants'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import {
  HttpException,
  IncorrectFieldOrParamTypeError,
  NotProvidedError
} from '@common/errors'
import { Field } from '@domain/enums'
import { IdentifierMock } from '@mocks/common'
import { DeleteVehicleMock } from '@mocks/vehicle'
import {
  IncorrectFieldOrParamTypeStub,
  NotProvidedStub
} from '@stubs/exceptions'

describe(`[DTO's] Delete Vehicle DTO`, () => {
  it('should call with the correct values', () => {
    const input = new DeleteVehicleDTO(IdentifierMock)

    expect(input).toBeInstanceOf(DeleteVehicleDTO)
    expect(input.id).toBe(DeleteVehicleMock.id)
  })

  it('should throw an error if id is invalid expected type', () => {
    const input: number = 1
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Field,
      Field.Id
    )

    expect(() => new DeleteVehicleDTO(input as any)).toThrow(httpException)
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

    expect(() => new DeleteVehicleDTO(input)).toThrow(httpException)
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
    expect(() => new DeleteVehicleDTO(null as any)).toThrow(httpException)
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
    expect(() => new DeleteVehicleDTO(undefined as any)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })
})

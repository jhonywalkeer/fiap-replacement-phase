import { UpdateVehicleDTO } from '@application/dtos/vehicle'
import { EmptyFiller } from '@common/constants'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { HttpException, NotProvidedError } from '@common/errors'
import { Field } from '@domain/enums'
import { UpdateVehicleMock } from '@mocks/vehicle'
import { NotProvidedStub } from '@stubs/exceptions'

describe(`[DTO's] Update Vehicle DTO`, () => {
  it('should call with the correct values', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      UpdateVehicleMock.brand,
      UpdateVehicleMock.model,
      UpdateVehicleMock.fuel,
      UpdateVehicleMock.year,
      UpdateVehicleMock.color,
      UpdateVehicleMock.price,
      UpdateVehicleMock.status
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(UpdateVehicleMock.brand)
    expect(input.model).toBe(UpdateVehicleMock.model)
    expect(input.fuel).toBe(UpdateVehicleMock.fuel)
    expect(input.year).toBe(UpdateVehicleMock.year)
    expect(input.color).toBe(UpdateVehicleMock.color)
    expect(input.price).toBe(UpdateVehicleMock.price)
    expect(input.status).toBe(UpdateVehicleMock.status)
  })

  it('should call with just the id', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(undefined)
    expect(input.model).toBe(undefined)
    expect(input.year).toBe(undefined)
    expect(input.color).toBe(undefined)
    expect(input.price).toBe(undefined)
    expect(input.fuel).toBe(undefined)
    expect(input.status).toBe(undefined)
  })

  it('should throw if id is not provided', () => {
    const input: string = EmptyFiller
    const httpException: HttpException = NotProvidedStub(
      Field.Id,
      IncorrectType.Param
    )

    expect(() => new UpdateVehicleDTO(input)).toThrow(httpException)
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
    expect(httpException.name).toBe(ErrorName.BadRequest)
    expect(httpException.message).toBe(
      new NotProvidedError(Field.Id, IncorrectType.Param).message
    )
  })

  it('should undefined if brand is not provided', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      undefined,
      UpdateVehicleMock.model,
      UpdateVehicleMock.fuel,
      UpdateVehicleMock.year,
      UpdateVehicleMock.color,
      UpdateVehicleMock.price,
      UpdateVehicleMock.status
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(undefined)
    expect(input.model).toBe(UpdateVehicleMock.model)
    expect(input.fuel).toBe(UpdateVehicleMock.fuel)
    expect(input.year).toBe(UpdateVehicleMock.year)
    expect(input.color).toBe(UpdateVehicleMock.color)
    expect(input.price).toBe(UpdateVehicleMock.price)
    expect(input.status).toBe(UpdateVehicleMock.status)
  })

  it('should undefined if model is not provided', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      UpdateVehicleMock.brand,
      undefined,
      UpdateVehicleMock.fuel,
      UpdateVehicleMock.year,
      UpdateVehicleMock.color,
      UpdateVehicleMock.price,
      UpdateVehicleMock.status
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(UpdateVehicleMock.brand)
    expect(input.model).toBe(undefined)
    expect(input.fuel).toBe(UpdateVehicleMock.fuel)
    expect(input.year).toBe(UpdateVehicleMock.year)
    expect(input.color).toBe(UpdateVehicleMock.color)
    expect(input.price).toBe(UpdateVehicleMock.price)
    expect(input.status).toBe(UpdateVehicleMock.status)
  })

  it('should undefined if fuel is not provided', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      UpdateVehicleMock.brand,
      UpdateVehicleMock.model,
      undefined,
      UpdateVehicleMock.year,
      UpdateVehicleMock.color,
      UpdateVehicleMock.price,
      UpdateVehicleMock.status
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(UpdateVehicleMock.brand)
    expect(input.model).toBe(UpdateVehicleMock.model)
    expect(input.fuel).toBe(undefined)
    expect(input.year).toBe(UpdateVehicleMock.year)
    expect(input.color).toBe(UpdateVehicleMock.color)
    expect(input.price).toBe(UpdateVehicleMock.price)
    expect(input.status).toBe(UpdateVehicleMock.status)
  })

  it('should undefined if year is not provided', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      UpdateVehicleMock.brand,
      UpdateVehicleMock.model,
      UpdateVehicleMock.fuel,
      undefined,
      UpdateVehicleMock.color,
      UpdateVehicleMock.price,
      UpdateVehicleMock.status
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(UpdateVehicleMock.brand)
    expect(input.model).toBe(UpdateVehicleMock.model)
    expect(input.fuel).toBe(UpdateVehicleMock.fuel)
    expect(input.year).toBe(undefined)
    expect(input.color).toBe(UpdateVehicleMock.color)
    expect(input.price).toBe(UpdateVehicleMock.price)
    expect(input.status).toBe(UpdateVehicleMock.status)
  })

  it('should undefined if color is not provided', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      UpdateVehicleMock.brand,
      UpdateVehicleMock.model,
      UpdateVehicleMock.fuel,
      UpdateVehicleMock.year,
      undefined,
      UpdateVehicleMock.price,
      UpdateVehicleMock.status
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(UpdateVehicleMock.brand)
    expect(input.model).toBe(UpdateVehicleMock.model)
    expect(input.fuel).toBe(UpdateVehicleMock.fuel)
    expect(input.year).toBe(UpdateVehicleMock.year)
    expect(input.color).toBe(undefined)
    expect(input.price).toBe(UpdateVehicleMock.price)
    expect(input.status).toBe(UpdateVehicleMock.status)
  })

  it('should undefined if price is not provided', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      UpdateVehicleMock.brand,
      UpdateVehicleMock.model,
      UpdateVehicleMock.fuel,
      UpdateVehicleMock.year,
      UpdateVehicleMock.color,
      undefined,
      UpdateVehicleMock.status
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(UpdateVehicleMock.brand)
    expect(input.model).toBe(UpdateVehicleMock.model)
    expect(input.fuel).toBe(UpdateVehicleMock.fuel)
    expect(input.year).toBe(UpdateVehicleMock.year)
    expect(input.color).toBe(UpdateVehicleMock.color)
    expect(input.price).toBe(undefined)
    expect(input.status).toBe(UpdateVehicleMock.status)
  })

  it('should undefined if status is not provided', () => {
    const input: UpdateVehicleDTO = new UpdateVehicleDTO(
      UpdateVehicleMock.id,
      UpdateVehicleMock.brand,
      UpdateVehicleMock.model,
      UpdateVehicleMock.fuel,
      UpdateVehicleMock.year,
      UpdateVehicleMock.color,
      UpdateVehicleMock.price,
      undefined
    )

    expect(input).toBeInstanceOf(UpdateVehicleDTO)
    expect(input.id).toBe(UpdateVehicleMock.id)
    expect(input.brand).toBe(UpdateVehicleMock.brand)
    expect(input.model).toBe(UpdateVehicleMock.model)
    expect(input.fuel).toBe(UpdateVehicleMock.fuel)
    expect(input.year).toBe(UpdateVehicleMock.year)
    expect(input.color).toBe(UpdateVehicleMock.color)
    expect(input.price).toBe(UpdateVehicleMock.price)
    expect(input.status).toBe(undefined)
  })
})

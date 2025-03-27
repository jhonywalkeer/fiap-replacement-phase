import { CreateVehicleDTO } from '@application/dtos/vehicle'
import { EmptyFiller } from '@common/constants'
import { IncorrectType, StatusCode } from '@common/enums'
import { HttpException, NotProvidedError } from '@common/errors'
import { Field, Fuel, VehicleStatus } from '@domain/enums'
import { CreateVehicleMock } from '@mocks/vehicle/create-vehicle.mock'
import { NotProvidedStub } from '@stubs/exceptions'

describe(`[DTO's] Create Vehicle DTO`, () => {
  it('should call with the correct values', () => {
    const input: CreateVehicleDTO = new CreateVehicleDTO(
      CreateVehicleMock.brand,
      CreateVehicleMock.model,
      CreateVehicleMock.fuel,
      CreateVehicleMock.year,
      CreateVehicleMock.color,
      CreateVehicleMock.price,
      CreateVehicleMock.status
    )

    expect(input).toBeInstanceOf(CreateVehicleDTO)
    expect(input.brand).toBe(CreateVehicleMock.brand)
    expect(input.model).toBe(CreateVehicleMock.model)
    expect(input.year).toBe(CreateVehicleMock.year)
    expect(input.color).toBe(CreateVehicleMock.color)
    expect(input.price).toBe(CreateVehicleMock.price)
    expect(input.fuel).toBe(CreateVehicleMock.fuel)
    expect(input.status).toBe(CreateVehicleMock.status)
  })

  it('should throw if brand is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Brand,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          undefined as any,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Brand, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if brand is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Brand,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          EmptyFiller as any,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Brand, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if brand is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Brand,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          null as any,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Brand, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if model is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Model,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          undefined as any,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Model, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if model is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Model,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          undefined as any,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Model, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if model is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Model,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          undefined as any,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Model, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should default value for fuel call with undefined', () => {
    const input: CreateVehicleDTO = new CreateVehicleDTO(
      CreateVehicleMock.brand,
      CreateVehicleMock.model,
      undefined as any,
      CreateVehicleMock.year,
      CreateVehicleMock.color,
      CreateVehicleMock.price,
      CreateVehicleMock.status
    )

    expect(input).toBeInstanceOf(CreateVehicleDTO)
    expect(input.brand).toBe(CreateVehicleMock.brand)
    expect(input.model).toBe(CreateVehicleMock.model)
    expect(input.fuel).toBe(Fuel.Gasoline)
    expect(input.year).toBe(CreateVehicleMock.year)
    expect(input.color).toBe(CreateVehicleMock.color)
    expect(input.price).toBe(CreateVehicleMock.price)
    expect(input.status).toBe(CreateVehicleMock.status)
  })

  it('should throw if year is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Year,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          undefined as any,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Year, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if year is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Year,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          EmptyFiller as any,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Year, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if year is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Year,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          null as any,
          CreateVehicleMock.color,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Year, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if color is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Color,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          undefined as any,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Color, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if color is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Color,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          EmptyFiller as any,
          CreateVehicleMock.price,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Color, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if color is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Color,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          null as any,
          CreateVehicleMock.price,

          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Color, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if price is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Price,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          undefined as any,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Price, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if price is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Price,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          EmptyFiller as any,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Price, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if price is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.Price,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateVehicleDTO(
          CreateVehicleMock.brand,
          CreateVehicleMock.model,
          CreateVehicleMock.fuel,
          CreateVehicleMock.year,
          CreateVehicleMock.color,
          null as any,
          CreateVehicleMock.status
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.Price, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should default value for status call with undefined', () => {
    const input: CreateVehicleDTO = new CreateVehicleDTO(
      CreateVehicleMock.brand,
      CreateVehicleMock.model,
      CreateVehicleMock.fuel,
      CreateVehicleMock.year,
      CreateVehicleMock.color,
      CreateVehicleMock.price,
      undefined as any
    )

    expect(input).toBeInstanceOf(CreateVehicleDTO)
    expect(input.brand).toBe(CreateVehicleMock.brand)
    expect(input.model).toBe(CreateVehicleMock.model)
    expect(input.year).toBe(CreateVehicleMock.year)
    expect(input.color).toBe(CreateVehicleMock.color)
    expect(input.price).toBe(CreateVehicleMock.price)
    expect(input.fuel).toBe(CreateVehicleMock.fuel)
    expect(input.status).toBe(VehicleStatus.Available)
  })
})

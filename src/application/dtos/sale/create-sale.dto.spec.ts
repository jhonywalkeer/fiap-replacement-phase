import { CreateSaleDTO } from '@application/dtos/sale'
import { EmptyFiller } from '@common/constants'
import { IncorrectType, StatusCode } from '@common/enums'
import {
  HttpException,
  IncorrectFieldOrParamTypeError,
  NotProvidedError
} from '@common/errors'
import { Field } from '@domain/enums'
import { CreateSaleMock, InputSaleMock } from '@mocks/sale'
import {
  IncorrectFieldOrParamTypeStub,
  NotProvidedStub
} from '@stubs/exceptions'

describe(`[DTO's] Create Sale DTO`, () => {
  const input_date = new Date(InputSaleMock.sale_date)
  const sale_date = new Date(CreateSaleMock.sale_date)

  it('should call with the correct values', () => {
    const input: CreateSaleDTO = new CreateSaleDTO(
      CreateSaleMock.vehicle_id,
      CreateSaleMock.buyer_id,
      CreateSaleMock.sale_date as any,
      CreateSaleMock.payment_id
    )

    expect(input).toBeInstanceOf(CreateSaleDTO)
    expect(input.buyer_id).toBe(CreateSaleMock.buyer_id)
    expect(input.vehicle_id).toBe(CreateSaleMock.vehicle_id)
    expect(input_date).toEqual(sale_date)
    expect(input.payment_id).toBe(CreateSaleMock.payment_id)
  })

  it('should throw if vehicle id is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.VehicleIdentification,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          undefined as any,
          CreateSaleMock.buyer_id,
          CreateSaleMock.sale_date as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.VehicleIdentification, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if vehicle id is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.VehicleIdentification,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          EmptyFiller as any,
          CreateSaleMock.buyer_id,
          CreateSaleMock.sale_date as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.VehicleIdentification, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if vehicle id is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.VehicleIdentification,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          null as any,
          CreateSaleMock.buyer_id,
          CreateSaleMock.sale_date as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.VehicleIdentification, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if buyer id is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.BuyerIdentification,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          CreateSaleMock.vehicle_id,
          undefined as any,
          CreateSaleMock.sale_date as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.BuyerIdentification, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if buyer id is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.BuyerIdentification,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          CreateSaleMock.vehicle_id,
          EmptyFiller as any,
          CreateSaleMock.sale_date as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.BuyerIdentification, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if buyer id is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.BuyerIdentification,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          CreateSaleMock.vehicle_id,
          null as any,
          CreateSaleMock.sale_date as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.BuyerIdentification, IncorrectType.Field)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if sale date is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.SaleDate,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          CreateSaleMock.vehicle_id,
          CreateSaleMock.buyer_id,
          undefined as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.SaleDate, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if sale date is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.SaleDate,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          CreateSaleMock.vehicle_id,
          CreateSaleMock.buyer_id,
          EmptyFiller as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.SaleDate, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if sale date is null', () => {
    const httpException: HttpException = NotProvidedStub(
      Field.SaleDate,
      IncorrectType.Field
    )

    expect(
      () =>
        new CreateSaleDTO(
          CreateSaleMock.vehicle_id,
          CreateSaleMock.buyer_id,
          null as any,
          CreateSaleMock.payment_id
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(Field.SaleDate, IncorrectType.Field).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should call with payment id is undefined', () => {
    const input: CreateSaleDTO = new CreateSaleDTO(
      CreateSaleMock.vehicle_id,
      CreateSaleMock.buyer_id,
      CreateSaleMock.sale_date as any,
      undefined as any
    )

    expect(input).toBeInstanceOf(CreateSaleDTO)
    expect(input.buyer_id).toBe(CreateSaleMock.buyer_id)
    expect(input.vehicle_id).toBe(CreateSaleMock.vehicle_id)
    expect(input_date).toEqual(sale_date)
    expect(input.payment_id).toBe(undefined)
  })

  it('should call with payment id is empty string', () => {
    const input: CreateSaleDTO = new CreateSaleDTO(
      CreateSaleMock.vehicle_id,
      CreateSaleMock.buyer_id,
      CreateSaleMock.sale_date as any,
      EmptyFiller as any
    )

    expect(input).toBeInstanceOf(CreateSaleDTO)
    expect(input.buyer_id).toBe(CreateSaleMock.buyer_id)
    expect(input.vehicle_id).toBe(CreateSaleMock.vehicle_id)
    expect(input_date).toEqual(sale_date)
    expect(input.payment_id).toBe(undefined)
  })

  it('should call with payment id is null', () => {
    const input: CreateSaleDTO = new CreateSaleDTO(
      CreateSaleMock.vehicle_id,
      CreateSaleMock.buyer_id,
      CreateSaleMock.sale_date as any,
      null as any
    )

    expect(input).toBeInstanceOf(CreateSaleDTO)
    expect(input.buyer_id).toBe(CreateSaleMock.buyer_id)
    expect(input.vehicle_id).toBe(CreateSaleMock.vehicle_id)
    expect(input_date).toEqual(sale_date)
    expect(input.payment_id).toBe(undefined)
  })

  it('should throw if payment id is not a valid uuid', () => {
    const httpException: HttpException = IncorrectFieldOrParamTypeStub(
      IncorrectType.Field,
      Field.PaymentIdentification
    )

    expect(
      () =>
        new CreateSaleDTO(
          CreateSaleMock.vehicle_id,
          CreateSaleMock.buyer_id,
          CreateSaleMock.sale_date as any,
          'invalid-uuid'
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new IncorrectFieldOrParamTypeError(
        IncorrectType.Field,
        Field.PaymentIdentification
      ).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })
})

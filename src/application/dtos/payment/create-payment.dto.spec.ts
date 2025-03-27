import { CreatePaymentDTO } from '@application/dtos/payment'
import { EmptyFiller } from '@common/constants'
import { IncorrectType, StatusCode } from '@common/enums'
import { HttpException, NotProvidedError } from '@common/errors'
import { CapitalizeFirstLetterFormat } from '@common/utils/formatters'
import { Field, PaymentMethod } from '@domain/enums'
import { CreatePaymentMock } from '@mocks/payment'
import { NotProvidedStub } from '@stubs/exceptions'

describe(`[DTO's] Create Payment DTO`, () => {
  it('should call with the correct values', () => {
    const input: CreatePaymentDTO = new CreatePaymentDTO(
      CreatePaymentMock.sale_id,
      CreatePaymentMock.amount,
      CreatePaymentMock.payment_method
    )

    expect(input).toBeInstanceOf(CreatePaymentDTO)
    expect(input.sale_id).toBe(CreatePaymentMock.sale_id)
    expect(input.amount).toBe(CreatePaymentMock.amount)
    expect(input.payment_method).toBe(
      CapitalizeFirstLetterFormat(CreatePaymentMock.payment_method)
    )
  })

  it('should call with debit card in payment method', () => {
    const input: CreatePaymentDTO = new CreatePaymentDTO(
      CreatePaymentMock.sale_id,
      CreatePaymentMock.amount,
      PaymentMethod.Debit,
      CreatePaymentMock.card
    )

    expect(input).toBeInstanceOf(CreatePaymentDTO)
    expect(input.sale_id).toBe(CreatePaymentMock.sale_id)
    expect(input.amount).toBe(CreatePaymentMock.amount)
    expect(input.payment_method).toBe(PaymentMethod.Debit)
  })

  it('should throw if sale id is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.SaleIdentification
    )

    expect(
      () =>
        new CreatePaymentDTO(
          undefined as any,
          CreatePaymentMock.amount,
          CreatePaymentMock.payment_method
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.SaleIdentification)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if sale id is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.SaleIdentification
    )

    expect(
      () =>
        new CreatePaymentDTO(
          EmptyFiller as any,
          CreatePaymentMock.amount,
          CreatePaymentMock.payment_method
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.SaleIdentification)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if sale id is null', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.SaleIdentification
    )

    expect(
      () =>
        new CreatePaymentDTO(
          null as any,
          CreatePaymentMock.amount,
          CreatePaymentMock.payment_method
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.SaleIdentification)
        .message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if amount is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.Price
    )

    expect(
      () =>
        new CreatePaymentDTO(
          CreatePaymentMock.sale_id,
          undefined as any,
          CreatePaymentMock.payment_method
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.Price).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if amount is null', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.Price
    )

    expect(
      () =>
        new CreatePaymentDTO(
          CreatePaymentMock.sale_id,
          null as any,
          CreatePaymentMock.payment_method
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.Price).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if amount is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.Price
    )

    expect(
      () =>
        new CreatePaymentDTO(
          CreatePaymentMock.sale_id,
          EmptyFiller as any,
          CreatePaymentMock.payment_method
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.Price).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if payment method is not provided', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.PaymentMethod
    )

    expect(
      () =>
        new CreatePaymentDTO(
          CreatePaymentMock.sale_id,
          CreatePaymentMock.amount,
          undefined as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.PaymentMethod).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if payment method is null', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.PaymentMethod
    )

    expect(
      () =>
        new CreatePaymentDTO(
          CreatePaymentMock.sale_id,
          CreatePaymentMock.amount,
          null as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.PaymentMethod).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should throw if payment method is empty string', () => {
    const httpException: HttpException = NotProvidedStub(
      IncorrectType.Field,
      Field.PaymentMethod
    )

    expect(
      () =>
        new CreatePaymentDTO(
          CreatePaymentMock.sale_id,
          CreatePaymentMock.amount,
          EmptyFiller as any
        )
    ).toThrow(httpException)

    expect(httpException.message).toBe(
      new NotProvidedError(IncorrectType.Field, Field.PaymentMethod).message
    )
    expect(httpException.statusCode).toBe(StatusCode.BadRequest)
  })
})

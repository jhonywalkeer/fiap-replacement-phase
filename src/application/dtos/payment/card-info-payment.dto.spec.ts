import { CreatePaymentMock } from '@mocks/payment'
import { CardInfoPaymentDTO } from './card-info-payment.dto'

describe(`[DTO's] Card Info Payment DTO`, () => {
  it('should call with the correct values', () => {
    const input: CardInfoPaymentDTO = new CardInfoPaymentDTO(
      CreatePaymentMock.card.type,
      CreatePaymentMock.card.flag,
      CreatePaymentMock.card.number,
      CreatePaymentMock.card.cvv,
      CreatePaymentMock.card.expiration_month,
      CreatePaymentMock.card.expiration_year
    )

    expect(input).toBeInstanceOf(CardInfoPaymentDTO)
    expect(input.type).toBe(CreatePaymentMock.card.type)
    expect(input.flag).toBe(CreatePaymentMock.card.flag)
    expect(input.number).toBe(CreatePaymentMock.card.number)
    expect(input.cvv).toBe(CreatePaymentMock.card.cvv)
    expect(input.expiration_month).toBe(CreatePaymentMock.card.expiration_month)
    expect(input.expiration_year).toBe(CreatePaymentMock.card.expiration_year)
  })
})

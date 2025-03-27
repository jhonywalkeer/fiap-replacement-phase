import { CreatedPaymentMock } from '@mocks/payment'
import { CreatePaymentQuery } from './create-payment.query'
import { CreatePayment } from '@domain/interfaces/payment'
import { PaymentMethod } from '@domain/enums'

describe('[Queries] Create Payment Query', () => {
  it('should create a payment query with the correct data', () => {
    const input: CreatePayment = {
      sale_id: CreatedPaymentMock.sale_id,
      status: CreatedPaymentMock.status,
      payment_method: CreatedPaymentMock.method as PaymentMethod,
      amount: 100.0
    }

    const result = CreatePaymentQuery(input)

    expect(result).toEqual({
      data: {
        sale_id: CreatedPaymentMock.sale_id,
        status: CreatedPaymentMock.status,
        method: CreatedPaymentMock.method as PaymentMethod,
        amount: 100.0
      }
    })
  })
})

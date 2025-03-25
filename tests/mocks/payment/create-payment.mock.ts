import { PaymentStatus } from '@domain/enums'
import { IdentifierMock } from '@mocks/common'

export const InputPaymentMock = {
  sale_id: IdentifierMock,
  amount: 33500.98,
  payment_method: 'credit',
  card: {
    type: 'credit',
    flag: 'visa',
    number: 5031433215406351,
    cvv: 123,
    expiration_month: 11,
    expiration_year: 2030
  }
}

export const CreatePaymentMock = InputPaymentMock

export const CreatedPaymentMock = {
  id: IdentifierMock,
  sale_id: CreatePaymentMock.sale_id,
  status: PaymentStatus.Approved,
  method: CreatePaymentMock.payment_method,
  amount: CreatePaymentMock.amount,
  created_at: new Date(),
  updated_at: new Date()
}

import { PaymentEntity } from './payment.entity'
import { PaymentMethod } from '@domain/enums'
import { BadRequestError } from '@common/errors'
import { IdentifierMock } from '@mocks/common'

describe('[Entities] Payment Entity', () => {
  const validPayment = {
    sale_id: IdentifierMock,
    amount: 100,
    method: PaymentMethod.Credit
  }

  it('should create a PaymentEntity instance with valid data', () => {
    const paymentEntity = PaymentEntity.create(validPayment)
    expect(paymentEntity).toBeInstanceOf(PaymentEntity)
  })

  it('should throw BadRequestError if amount is less than or equal to 0', () => {
    const invalidPayment = { ...validPayment, amount: 0 }
    expect(() => PaymentEntity.create(invalidPayment)).toThrow(BadRequestError)
  })
})

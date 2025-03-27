import { PaymentWithSaleEntity } from './payment-with-sale.entity'
import { PaymentStatus, PaymentMethod } from '@domain/enums'
import { PaymentWithSale, Sale } from '@domain/interfaces'
import { IdentifierMock } from '@mocks/common'

describe('[Entities] Payment With Sale Entity', () => {
  const saleMock: Omit<Sale, 'payment_id'> = {
    id: IdentifierMock,
    vehicle_id: IdentifierMock,
    buyer_id: IdentifierMock,
    sale_date: new Date('2025-03-15T01:00:00.000Z')
  }

  const paymentMock: PaymentWithSale = {
    id: IdentifierMock,
    sale: saleMock,
    status: PaymentStatus.Pending,
    method: PaymentMethod.Debit,
    reason: 'Test reason'
  }

  it('should create an instance of PaymentWithSaleEntity', () => {
    const entity = PaymentWithSaleEntity.create(paymentMock)

    expect(entity).toBeInstanceOf(PaymentWithSaleEntity)
    expect(entity.id).toBe(paymentMock.id)
    expect(entity.sale).toEqual(paymentMock.sale)
    expect(entity.status).toBe(paymentMock.status)
    expect(entity.method).toBe(paymentMock.method)
    expect(entity.reason).toBe(paymentMock.reason)
  })

  it('should handle optional reason property correctly', () => {
    const paymentWithoutReason = { ...paymentMock, reason: undefined }
    const entity = PaymentWithSaleEntity.create(paymentWithoutReason)

    expect(entity.reason).toBeUndefined()
  })
})

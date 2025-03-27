import { CreatedSaleMock } from '@mocks/sale'
import { SaleEntity } from './sale.entity'
import { Sale } from '@domain/interfaces/sale'

describe('[Entities] Sale Entity', () => {
  it('should create a Sale Entity instance with the correct properties', () => {
    const saleEntity = SaleEntity.create(CreatedSaleMock as any)

    expect(saleEntity).toBeInstanceOf(SaleEntity)
    expect(saleEntity.id).toBe(CreatedSaleMock.id)
    expect(saleEntity.vehicle_id).toBe(CreatedSaleMock.vehicle_id)
    expect(saleEntity.buyer_id).toBe(CreatedSaleMock.buyer_id)
    expect(saleEntity.sale_date).toEqual(CreatedSaleMock.sale_date)
    expect(saleEntity.payment_id).toBe(CreatedSaleMock.payment_id)
  })

  it('should handle null payment id correctly', () => {
    const saleWithoutPayment: Sale = {
      ...CreatedSaleMock,
      payment_id: null as any
    } as any
    const saleEntity = SaleEntity.create(saleWithoutPayment)

    expect(saleEntity.payment_id).toBeNull()
  })
})

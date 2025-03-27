import { PaymentWithSaleMap } from '@application/mappers/payment'
import { FindedPaymentWithSaleMock } from '@mocks/payment'

describe('[Mappers] Payment With Sale Map', () => {
  it('should return the correct payment with sale object', () => {
    const payment = FindedPaymentWithSaleMock
    const sale = FindedPaymentWithSaleMock.sale
    const paymentWithSale = PaymentWithSaleMap.execute(
      payment as any,
      sale as any
    )
    expect(paymentWithSale).toEqual({
      id: payment.id,
      sale: {
        id: sale.id,
        vehicle_id: sale.vehicle_id,
        buyer_id: sale.buyer_id,
        sale_date: sale.sale_date
      },
      status: payment.status,
      method: payment.method
    })
  })
})

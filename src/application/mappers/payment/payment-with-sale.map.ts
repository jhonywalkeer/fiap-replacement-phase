import { PaymentWithSaleEntity } from '@domain/entities/'
import { PaymentMethod, PaymentStatus } from '@domain/enums'
import { Payment, Sale } from '@domain/interfaces'

export class PaymentWithSaleMap {
  static execute(payment: Payment & Sale, sale: Sale): PaymentWithSaleEntity {
    return {
      id: payment?.id,
      sale: {
        id: sale?.id,
        vehicle_id: sale?.vehicle_id,
        buyer_id: sale?.buyer_id,
        sale_date: sale?.sale_date
      },
      status: payment?.status as PaymentStatus,
      method: payment?.method as PaymentMethod
    }
  }
}

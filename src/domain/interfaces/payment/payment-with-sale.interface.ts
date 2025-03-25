import { PaymentMethod, PaymentStatus } from '@domain/enums'
import { Sale } from '@domain/interfaces'

export type PaymentWithSale = {
  id: string
  sale: {
    id: Sale['id']
    vehicle_id: Sale['vehicle_id']
    buyer_id: Sale['buyer_id']
    sale_date: Sale['sale_date']
  }
  status: PaymentStatus
  method: PaymentMethod
  reason?: string
}

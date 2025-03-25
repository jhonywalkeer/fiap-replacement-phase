import { PaymentStatus, PaymentMethod } from '@domain/enums'
import { PaymentWithSale, Sale } from '@domain/interfaces'

export class PaymentWithSaleEntity {
  id: string
  sale: Omit<Sale, 'payment_id'>
  status: PaymentStatus
  method: PaymentMethod
  reason?: string

  private constructor(payment: PaymentWithSale) {
    this.id = payment.id
    this.sale = payment.sale
    this.status = payment.status
    this.method = payment.method
    this.reason = payment.reason
  }

  static create(props: PaymentWithSale): PaymentWithSaleEntity {
    return new PaymentWithSaleEntity(props)
  }
}

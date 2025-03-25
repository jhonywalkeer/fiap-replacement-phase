import { PaymentMethod, PaymentStatus } from '@domain/enums'
import { CardInfoPayment } from './card-info-payment.interface'

export type CreatePayment = {
  sale_id: string
  amount: number
  payment_method: PaymentMethod
  status: PaymentStatus
  card?: CardInfoPayment
  social_security_number?: string
  reason?: string
}

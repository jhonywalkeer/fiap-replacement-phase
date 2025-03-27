import { PaymentStatus } from '@domain/enums'

export type UpdatePayment = {
  id: string
  payment_id: string
  status: PaymentStatus
  reason: string
}

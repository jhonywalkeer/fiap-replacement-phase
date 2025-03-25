import { PaymentMethod, PaymentStatus } from '@domain/enums'

export type Payment = {
  id?: string
  sale_id: string
  amount: number
  method: PaymentMethod
  status?: PaymentStatus
  qr_code?: string
  created_at?: Date
  updated_at?: Date
}

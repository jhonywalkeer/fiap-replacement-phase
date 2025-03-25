import { Payment } from './payment.interface'

export type FindPaymentByCondition = {
  sale_id: Payment['sale_id']
  amount: Payment['amount']
  method: Payment['method']
}

import { CreatePayment } from '@domain/interfaces/payment'

export const CreatePaymentQuery = (input: CreatePayment) => {
  return {
    data: {
      sale_id: input.sale_id,
      status: input.status,
      method: input.payment_method,
      amount: input.amount
    }
  }
}

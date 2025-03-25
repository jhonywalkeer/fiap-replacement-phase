import { FindPaymentByCondition } from '@domain/interfaces/payment'

export const FindPaymentByConditionQuery = (
  parameter: FindPaymentByCondition
) => {
  return {
    where: {
      sale_id: parameter.sale_id,
      amount: parameter.amount,
      method: parameter.method
    }
  }
}

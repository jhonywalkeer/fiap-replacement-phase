import { CreatedPaymentMock } from '@mocks/payment'
import { FindPaymentByConditionQuery } from './find-payment-by-condition.query'
import { FindPaymentByCondition } from '@domain/interfaces/payment'
import { PaymentMethod } from '@domain/enums'

describe('[Queries] Find Payment By Condition Query', () => {
  it('should create a query with the correct parameters', () => {
    const parameter: FindPaymentByCondition = {
      sale_id: CreatedPaymentMock.sale_id,
      method: CreatedPaymentMock.method as PaymentMethod,
      amount: 100
    }

    const query = FindPaymentByConditionQuery(parameter)

    expect(query).toEqual({
      where: {
        sale_id: CreatedPaymentMock.sale_id,
        method: CreatedPaymentMock.method as PaymentMethod,
        amount: 100
      }
    })
  })

  it('should handle missing optional parameters', () => {
    const parameter: FindPaymentByCondition = {
      sale_id: CreatedPaymentMock.sale_id,
      method: undefined as any,
      amount: 100
    }

    const query = FindPaymentByConditionQuery(parameter)

    expect(query).toEqual({
      where: {
        sale_id: CreatedPaymentMock.sale_id,
        method: undefined as any,
        amount: 100
      }
    })
  })
})

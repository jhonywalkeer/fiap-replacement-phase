import { FindPaymentByIdQuery } from './find-payment-by-id.query'

describe('[Queries] Find Payment By Id Query', () => {
  const result = {
    where: { id: '123' },
    include: {
      sale: true
    }
  }

  it('should return the correct query object', () => {
    const parameter = { id: '123' }
    const query = FindPaymentByIdQuery(parameter)
    expect(query).toEqual(result)
  })

  it('should handle empty parameter', () => {
    const parameter = { id: '' }
    const query = FindPaymentByIdQuery(parameter)
    expect(query).toEqual({ ...result, where: { id: '' } })
  })

  it('should handle null parameter', () => {
    const parameter = { id: null }
    const query = FindPaymentByIdQuery(parameter as any)
    expect(query).toEqual({ ...result, where: { id: null } })
  })
})

import { Decimal } from '@common/utils/formatters'

describe('[Formaters] Decimal', () => {
  it('should create a Decimal from a number', () => {
    const decimal = new Decimal(10)
    expect(decimal.toNumber()).toBe(10)
  })

  it('should create a Decimal from a string', () => {
    const decimal = new Decimal('10.5')
    expect(decimal.toNumber()).toBe(10.5)
  })

  it('should format the number as a string with two decimal places', () => {
    const decimal = new Decimal(10)
    expect(decimal.toString()).toBe('10.00')
  })

  it('should add two Decimal instances', () => {
    const firstDecimal = new Decimal(10)
    const secondDecimal = new Decimal(5)
    const result = firstDecimal.add(secondDecimal)
    expect(result.toNumber()).toBe(15)
  })

  it('should subtract two Decimal instances', () => {
    const firstDecimal = new Decimal(10)
    const secondDecimal = new Decimal(5)
    const result = firstDecimal.subtract(secondDecimal)
    expect(result.toNumber()).toBe(5)
  })

  it('should multiply two Decimal instances', () => {
    const firstDecimal = new Decimal(10)
    const secondDecimal = new Decimal(5)
    const result = firstDecimal.multiply(secondDecimal)
    expect(result.toNumber()).toBe(50)
  })

  it('should divide two Decimal instances', () => {
    const firstDecimal = new Decimal(10)
    const secondDecimal = new Decimal(5)
    const result = firstDecimal.divide(secondDecimal)
    expect(result.toNumber()).toBe(2)
  })
})

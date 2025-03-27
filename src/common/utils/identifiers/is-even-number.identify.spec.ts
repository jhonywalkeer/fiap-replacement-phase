import { IsEvenNumberIdentify } from './is-even-number.identify'

describe('IsEvenNumberIdentify', () => {
  it('should return true for even numbers', () => {
    expect(IsEvenNumberIdentify(2)).toBe(true)
    expect(IsEvenNumberIdentify(0)).toBe(true)
    expect(IsEvenNumberIdentify(-4)).toBe(true)
  })

  it('should return false for odd numbers', () => {
    expect(IsEvenNumberIdentify(1)).toBe(false)
    expect(IsEvenNumberIdentify(-3)).toBe(false)
  })

  it('should return false for non-integer numbers', () => {
    expect(IsEvenNumberIdentify(2.5)).toBe(false)
    expect(IsEvenNumberIdentify(-1.1)).toBe(false)
  })
})

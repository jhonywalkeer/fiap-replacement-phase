import { PluralWordFormat } from '@common/utils/formatters'

describe('[Formaters] Plural Word Format', () => {
  it('should add "s" to a singular word', () => {
    expect(PluralWordFormat('cat')).toBe('cats')
  })

  it('should return the same word if it already ends with "s"', () => {
    expect(PluralWordFormat('dogs')).toBe('dogs')
  })

  it('should return an empty string if the input is an empty string', () => {
    expect(PluralWordFormat('')).toBe('')
  })
})

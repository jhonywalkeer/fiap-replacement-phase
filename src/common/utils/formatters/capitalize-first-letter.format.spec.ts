import { CapitalizeFirstLetterFormat } from '@common/utils/formatters'

describe('[Formaters] Capitalize First Letter Format', () => {
  it('should capitalize the first letter of a word', () => {
    expect(CapitalizeFirstLetterFormat('word')).toBe('Word')
  })

  it('should return an empty string if input is empty', () => {
    expect(CapitalizeFirstLetterFormat('')).toBe('')
  })

  it('should capitalize the first letter if the word is a single character', () => {
    expect(CapitalizeFirstLetterFormat('a')).toBe('A')
  })

  it('should not change the first character if it is not a letter', () => {
    expect(CapitalizeFirstLetterFormat('1word')).toBe('1word')
  })
})

export const PluralWordFormat = (word: string): string => {
  if (!word) return ''
  if (word.endsWith('s')) return word

  return word + 's'
}

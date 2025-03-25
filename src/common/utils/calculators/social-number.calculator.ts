export const SocialNumberCalculator = (base: string): number => {
  const sum = base
    .split('')
    .map((num, idx) => Number(num) * (base.length + 1 - idx))
    .reduce((acc, val) => acc + val, 0)

  const remainder = (sum * 10) % 11
  return remainder === 10 ? 0 : remainder
}

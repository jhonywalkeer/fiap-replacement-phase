import { Mail } from '@domain/value-objects'

export const IsMail = (value: string): string => {
  return new Mail(value).getValue()
}

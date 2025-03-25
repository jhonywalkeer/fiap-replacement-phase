import { LegalAge } from '@domain/value-objects'

export const IsLegalAge = (value: Date): Date => {
  return new LegalAge(value).getValue()
}

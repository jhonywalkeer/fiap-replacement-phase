import { SocialNumber } from '@domain/value-objects'

export const IsSocialSecurityNumber = (value: string): string => {
  return new SocialNumber(value).getValue()
}

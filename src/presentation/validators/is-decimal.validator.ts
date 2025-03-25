import { Pattern } from '@common/constants'
import { IncorrectType, Type } from '@common/enums'
import { IncorrectFieldOrParamTypeError } from '@common/errors'

export const IsDecimal = (value: any, identifier: string): number => {
  if (typeof value !== Type.number && !Pattern.Decimal.test(value)) {
    throw new IncorrectFieldOrParamTypeError(IncorrectType.Field, identifier)
  }
  return value
}

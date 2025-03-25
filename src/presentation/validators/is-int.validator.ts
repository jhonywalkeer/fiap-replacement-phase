import { IncorrectType, Type } from '@common/enums'
import { IncorrectFieldOrParamTypeError } from '@common/errors'

export const IsInt = (value: any, identifier: string): number => {
  if (typeof value !== Type.number) {
    throw new IncorrectFieldOrParamTypeError(IncorrectType.Field, identifier)
  }
  return value
}

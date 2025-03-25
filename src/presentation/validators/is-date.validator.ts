import { Pattern } from '@common/constants'
import { IncorrectType } from '@common/enums'
import { IncorrectFieldOrParamTypeError } from '@common/errors'

export const IsDate = (value: any, identifier: string): Date => {
  if (!Pattern.Date.test(value)) {
    throw new IncorrectFieldOrParamTypeError(IncorrectType.Field, identifier)
  }
  return new Date(value)
}

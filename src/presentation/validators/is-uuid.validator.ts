import { Pattern } from '@common/constants'
import { IncorrectType } from '@common/enums'
import { IncorrectFieldOrParamTypeError } from '@common/errors'

export const IsUUID = (value: any, identifier: string): string => {
  if (!Pattern.UUID.test(value)) {
    throw new IncorrectFieldOrParamTypeError(IncorrectType.Param, identifier)
  }
  return value
}

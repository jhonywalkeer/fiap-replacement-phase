import { Pattern } from '@common/constants'
import { IncorrectFieldOrParamTypeError } from '@common/errors'
import { IsFieldOrParamIdentify } from '@common/utils/identifiers'

export const IsUUID = (
  value: any,
  identifier: string,
  paramOrField?: string
): string => {
  if (!Pattern.UUID.test(value)) {
    throw new IncorrectFieldOrParamTypeError(
      IsFieldOrParamIdentify(paramOrField),
      identifier
    )
  }
  return value
}

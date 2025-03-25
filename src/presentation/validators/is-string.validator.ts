import { Type } from '@common/enums'
import { IncorrectFieldOrParamTypeError } from '@common/errors'
import { IsFieldOrParamIdentify } from '@common/utils/identifiers'

export const IsString = (
  value: any,
  identifier: string,
  fieldOrParam?: string
): string => {
  if (typeof value !== Type.string) {
    throw new IncorrectFieldOrParamTypeError(
      IsFieldOrParamIdentify(fieldOrParam),
      identifier
    )
  }

  return value
}

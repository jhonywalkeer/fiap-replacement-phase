import { IncorrectFieldOrParamTypeError } from '@common/errors'
import { IsFieldOrParamIdentify } from '@common/utils/identifiers'

export const IsEnum = (
  value: string,
  identifier: any,
  property: string,
  fieldOrParam?: string
) => {
  if (!Object.values(identifier).includes(value)) {
    throw new IncorrectFieldOrParamTypeError(
      IsFieldOrParamIdentify(fieldOrParam),
      property
    )
  }
  return value
}

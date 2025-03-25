import { IncorrectType } from '@common/enums'

export const IsFieldOrParamIdentify = (
  fieldOrParam: string | undefined
): string => {
  const isFieldOrParam =
    fieldOrParam === IncorrectType.Param
      ? IncorrectType.Param
      : IncorrectType.Field

  return isFieldOrParam
}

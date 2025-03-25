import { EmptyFiller } from '@common/constants'
import { NotProvidedError } from '@common/errors'

export const IsProvided = (
  type: string,
  value: unknown,
  fieldOrParam: string
): unknown => {
  if (value === null || value === EmptyFiller || value === undefined) {
    throw new NotProvidedError(fieldOrParam, type)
  }
  return value
}

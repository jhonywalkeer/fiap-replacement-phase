import { HttpException, NotProvidedError } from '@common/errors'

export const NotProvidedStub = (
  type: string,
  fieldOrParam: string
): HttpException => {
  return new NotProvidedError(type, fieldOrParam)
}

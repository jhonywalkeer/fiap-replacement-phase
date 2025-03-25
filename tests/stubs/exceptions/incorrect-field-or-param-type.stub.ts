import { HttpException, IncorrectFieldOrParamTypeError } from '@common/errors'

export const IncorrectFieldOrParamTypeStub = (
  type: string,
  property: string
): HttpException => {
  return new IncorrectFieldOrParamTypeError(type, property)
}

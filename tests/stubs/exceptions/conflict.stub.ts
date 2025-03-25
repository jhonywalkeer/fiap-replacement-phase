import { HttpException, ConflictError } from '@common/errors'

export const ConflictStub = (field: string): HttpException => {
  return new ConflictError(field)
}

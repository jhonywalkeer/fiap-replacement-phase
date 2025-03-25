import { HttpException, NotFoundError } from '@common/errors'

export const NotFoundStub = (field: string): HttpException => {
  return new NotFoundError(field)
}

import { BadRequestError, HttpException } from '@common/errors'

export const BadRequestStub = (message: string): HttpException => {
  return new BadRequestError(message)
}

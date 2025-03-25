import { ErrorName, StatusCode } from '@common/enums'
import { HttpException } from './http.exception'

export class BadRequestError extends HttpException {
  statusCode = StatusCode.BadRequest
  name = ErrorName.BadRequest

  constructor(message: string) {
    super(message)
  }
}

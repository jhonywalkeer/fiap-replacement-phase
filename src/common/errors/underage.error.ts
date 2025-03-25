import { ErrorMessage, ErrorName, StatusCode } from '@common/enums'
import { HttpException } from './http.exception'

export class UnderAgeError extends HttpException {
  statusCode = StatusCode.BadRequest
  name = ErrorName.BadRequest

  constructor() {
    super(ErrorMessage.UnderAge)
  }
}

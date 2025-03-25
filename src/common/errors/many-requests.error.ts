import { ErrorMessage, ErrorName, StatusCode } from '@common/enums'
import { HttpException } from '@common/errors'

export class ManyRequestsError extends HttpException {
  statusCode = StatusCode.TooManyRequests
  name = ErrorName.InternalError

  constructor() {
    super(ErrorMessage.RateLimit)
  }
}

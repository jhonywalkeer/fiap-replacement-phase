import { ErrorMessage, ErrorName, StatusCode } from '@common/enums'
import { HttpException } from '@common/errors'

export class SocialNumberError extends HttpException {
  statusCode = StatusCode.BadRequest
  name = ErrorName.BadRequest

  constructor() {
    super(ErrorMessage.SocialNumber)
  }
}

import { ErrorName, StatusCode } from '@common/enums'
import { ErrorResponse } from '@common/types'

export class HttpException extends Error implements ErrorResponse {
  public statusCode = StatusCode.InternalServer
  public messages: string[] = []

  constructor(message?: string) {
    super(message)
    this.message = message || this.name
    this.name = ErrorName.InternalError
    this.messages.push(this.message)
  }
}

import { OperationIdentify } from '@common/utils/identifiers'
import { HttpException } from '@common/errors'
import { ErrorName, StatusCode } from '@common/enums'

export class NotOccurredError extends HttpException {
  statusCode = StatusCode.InternalServer
  name = ErrorName.InternalError

  constructor(operation: string, field: string) {
    const message = `Ao tentar ${OperationIdentify(operation)} ${field}, não foi possível realizar a operação!`
    super(message)
  }
}

import { ErrorName, StatusCode } from '@common/enums'
import { HttpException } from '@common/errors'

export class IncorrectFieldOrParamTypeError extends HttpException {
  statusCode = StatusCode.BadRequest
  name = ErrorName.InvalidParameters

  constructor(property: string, fieldOrParam: string) {
    super(
      `O tipo esperado para o ${property} ${fieldOrParam} não corresponde ao tipo recebido.`
    )
  }
}

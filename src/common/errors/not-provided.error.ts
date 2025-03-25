import { ErrorName, StatusCode } from '@common/enums'
import { HttpException } from './http.exception'
import { CapitalizeFirstLetterFormat } from '@common/utils/formatters'

export class NotProvidedError extends HttpException {
  statusCode = StatusCode.BadRequest
  name = ErrorName.BadRequest

  constructor(identifier: string, fieldOrParam: string) {
    super(
      `${CapitalizeFirstLetterFormat(identifier)} não fornecido(a) no ${fieldOrParam}!`
    )
  }
}

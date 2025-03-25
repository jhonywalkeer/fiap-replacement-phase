import { StatusCode, ErrorName } from '@common/enums'
import { HttpException } from './http.exception'

export class NotFoundError extends HttpException {
  statusCode = StatusCode.NotFound
  name = ErrorName.NotFoundInformation

  constructor(field: string) {
    super(`Ao tentar buscar ${field} não foi encontrado nenhum registro!`)
  }
}

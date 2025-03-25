import { StatusCode, ErrorName } from '@common/enums'
import { HttpException } from './http.exception'

export class ConflictError extends HttpException {
  statusCode = StatusCode.Conflict
  name = ErrorName.ConflictInformation

  constructor(field: string) {
    super(`Ao tentar criar ${field} foi identificado um registro existente!`)
  }
}

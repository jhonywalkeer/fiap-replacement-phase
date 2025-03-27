import { ErrorName, StatusCode } from '@common/enums'
import { ConflictError } from './conflict.error'

describe('[Errors] Conflict Error', () => {
  const identifier = 'campo de exemplo'

  it('should have the correct status code', () => {
    const error = new ConflictError(identifier)
    expect(error.statusCode).toBe(StatusCode.Conflict)
  })

  it('should have the correct error name', () => {
    const error = new ConflictError(identifier)
    expect(error.name).toBe(ErrorName.ConflictInformation)
  })

  it('should have the correct error message', () => {
    const error = new ConflictError(identifier)
    expect(error.message).toBe(
      `Ao tentar criar ${identifier} foi identificado um registro existente!`
    )
  })
})

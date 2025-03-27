import { NotProvidedError } from '@common/errors'
import { ErrorName, IncorrectType, StatusCode } from '@common/enums'
import { CapitalizeFirstLetterFormat } from '@common/utils/formatters'

describe('[Errors] Not Provided Error', () => {
  const identifier = 'campo de exemplo'

  it('should have the correct status code case field', () => {
    const error = new NotProvidedError(identifier, IncorrectType.Field)
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct status code case param', () => {
    const error = new NotProvidedError(identifier, IncorrectType.Param)
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct error name case field', () => {
    const error = new NotProvidedError(identifier, IncorrectType.Field)
    expect(error.name).toBe(ErrorName.BadRequest)
  })

  it('should have the correct error name case param', () => {
    const error = new NotProvidedError(identifier, IncorrectType.Param)
    expect(error.name).toBe(ErrorName.BadRequest)
  })

  it('should have the correct error message case field', () => {
    const error = new NotProvidedError(identifier, IncorrectType.Field)
    expect(error.message).toBe(
      `${CapitalizeFirstLetterFormat(identifier)} não fornecido(a) no ${IncorrectType.Field}!`
    )
  })

  it('should have the correct error message case param', () => {
    const error = new NotProvidedError(identifier, IncorrectType.Param)
    expect(error.message).toBe(
      `${CapitalizeFirstLetterFormat(identifier)} não fornecido(a) no ${IncorrectType.Param}!`
    )
  })
})

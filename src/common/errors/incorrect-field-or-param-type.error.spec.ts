import {
  ErrorName,
  // ErrorMessage,
  // ErrorName,
  IncorrectType,
  StatusCode
} from '@common/enums'
import { IncorrectFieldOrParamTypeError } from '@common/errors'

describe('[Errors] Incorrect Field Or Param Type Error', () => {
  const propExample = 'propriedade de teste'

  it('should have the correct status code case field', () => {
    const error = new IncorrectFieldOrParamTypeError(
      propExample,
      IncorrectType.Field
    )
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct status code case param', () => {
    const error = new IncorrectFieldOrParamTypeError(
      propExample,
      IncorrectType.Field
    )
    expect(error.statusCode).toBe(StatusCode.BadRequest)
  })

  it('should have the correct error name case field', () => {
    const error = new IncorrectFieldOrParamTypeError(
      propExample,
      IncorrectType.Field
    )
    expect(error.name).toBe(ErrorName.InvalidParameters)
  })

  it('should have the correct error name case param', () => {
    const error = new IncorrectFieldOrParamTypeError(
      propExample,
      IncorrectType.Param
    )
    expect(error.name).toBe(ErrorName.InvalidParameters)
  })

  it('should have the correct error message case field', () => {
    const error = new IncorrectFieldOrParamTypeError(
      propExample,
      IncorrectType.Field
    )
    expect(error.message).toBe(
      `O tipo esperado para o ${propExample} ${IncorrectType.Field} não corresponde ao tipo recebido.`
    )
  })

  it('should have the correct error message case param', () => {
    const error = new IncorrectFieldOrParamTypeError(
      propExample,
      IncorrectType.Param
    )
    expect(error.message).toBe(
      `O tipo esperado para o ${propExample} ${IncorrectType.Param} não corresponde ao tipo recebido.`
    )
  })
})

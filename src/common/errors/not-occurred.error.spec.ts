import { NotOccurredError } from '@common/errors'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { OperationIdentify } from '@common/utils/identifiers'

describe('[Errors] Not Provided Error', () => {
  const propExample = 'propriedade de exemplo'

  it('should have the correct status code case operation equals find', () => {
    const error = new NotOccurredError(Operation.Find, propExample)
    expect(error.statusCode).toBe(StatusCode.InternalServer)
  })

  it('should have the correct status code case operation equals create', () => {
    const error = new NotOccurredError(Operation.Find, propExample)
    expect(error.statusCode).toBe(StatusCode.InternalServer)
  })

  it('should have the correct status code case operation equals update', () => {
    const error = new NotOccurredError(Operation.Update, propExample)
    expect(error.statusCode).toBe(StatusCode.InternalServer)
  })

  it('should have the correct status code case operation equals delete', () => {
    const error = new NotOccurredError(Operation.Delete, propExample)
    expect(error.statusCode).toBe(StatusCode.InternalServer)
  })

  it('should have the correct error name case operation equals find', () => {
    const error = new NotOccurredError(Operation.Delete, propExample)
    expect(error.name).toBe(ErrorName.InternalError)
  })

  it('should have the correct error name case operation equals create', () => {
    const error = new NotOccurredError(Operation.Create, propExample)
    expect(error.name).toBe(ErrorName.InternalError)
  })

  it('should have the correct error name case operation equals update', () => {
    const error = new NotOccurredError(Operation.Update, propExample)
    expect(error.name).toBe(ErrorName.InternalError)
  })

  it('should have the correct error name case operation equals delete', () => {
    const error = new NotOccurredError(Operation.Delete, propExample)
    expect(error.name).toBe(ErrorName.InternalError)
  })

  it('should have the correct error message case operation equals create', () => {
    const error = new NotOccurredError(Operation.Create, propExample)
    expect(error.message).toBe(
      `Ao tentar ${OperationIdentify(Operation.Create)} ${propExample}, não foi possível realizar a operação!`
    )
  })

  it('should have the correct error message case operation equals find', () => {
    const error = new NotOccurredError(Operation.Find, propExample)
    expect(error.message).toBe(
      `Ao tentar ${OperationIdentify(Operation.Find)} ${propExample}, não foi possível realizar a operação!`
    )
  })

  it('should have the correct error message case operation equals update', () => {
    const error = new NotOccurredError(Operation.Update, propExample)
    expect(error.message).toBe(
      `Ao tentar ${OperationIdentify(Operation.Update)} ${propExample}, não foi possível realizar a operação!`
    )
  })

  it('should have the correct error message case operation equals delete', () => {
    const error = new NotOccurredError(Operation.Delete, propExample)
    expect(error.message).toBe(
      `Ao tentar ${OperationIdentify(Operation.Delete)} ${propExample}, não foi possível realizar a operação!`
    )
  })
})

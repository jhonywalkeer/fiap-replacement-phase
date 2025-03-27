import { ErrorName, StatusCode } from '@common/enums'
import { NotFoundError } from '@common/errors'

describe('[Errors] Not Found Error', () => {
  const fieldExample = 'campo de exemplo'

  it('should have the correct status code', () => {
    const error = new NotFoundError(fieldExample)
    expect(error.statusCode).toBe(StatusCode.NotFound)
  })

  it('should have the correct error name', () => {
    const error = new NotFoundError(fieldExample)
    expect(error.name).toBe(ErrorName.NotFoundInformation)
  })

  it('should have the correct error message', () => {
    const error = new NotFoundError(fieldExample)
    expect(error.message).toBe(
      `Ao tentar buscar ${fieldExample} não foi encontrado nenhum registro!`
    )
  })
})

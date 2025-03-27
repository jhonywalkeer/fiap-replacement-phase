import { HttpException } from '@common/errors'
import { ErrorName, StatusCode } from '@common/enums'

describe('[Errors] Http Exception', () => {
  it('should create an instance of HttpException with default values', () => {
    const exception = new HttpException()

    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.statusCode).toBe(StatusCode.InternalServer)
    expect(exception.messages).toEqual(['Error'])
    expect(exception.message).toBe('Error')
    expect(exception.name).toBe(ErrorName.InternalError)
  })

  it('should create an instance of HttpException with a custom message', () => {
    const customMessage = 'Custom error message'
    const exception = new HttpException(customMessage)

    expect(exception).toBeInstanceOf(HttpException)
    expect(exception.statusCode).toBe(StatusCode.InternalServer)
    expect(exception.messages).toEqual([customMessage])
    expect(exception.message).toBe(customMessage)
    expect(exception.name).toBe(ErrorName.InternalError)
  })
})

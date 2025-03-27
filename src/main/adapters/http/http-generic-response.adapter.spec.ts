import { StatusCode } from '@common/enums'
import { HttpGenericResponseAdapter } from './http-generic-response.adapter'

describe('[Helpers] Http Generic Response', () => {
  it('should return a response with body and status code', async () => {
    const genericResponse = new HttpGenericResponseAdapter()
    const body = {
      message: 'Hello, World!'
    }
    const statusCode = StatusCode.Sucess
    const message = 'Success'

    const response = await genericResponse.response(body, statusCode, message)

    expect(response).toEqual({
      body,
      statusCode,
      message
    })
  })
})

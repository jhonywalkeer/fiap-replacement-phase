import { SwaggerDummy } from '@dummies/swagger'
import { SwaggerDocumention } from '@main/framework'

jest.mock('@docs/api/swagger/swagger.json', () => SwaggerDummy)

describe('[Framework] Swagger Documention', () => {
  it('should load the swagger documentation', () => {
    expect(SwaggerDocumention).toEqual(SwaggerDummy)
  })

  it('should have the correct API version', () => {
    expect(SwaggerDocumention.openapi).toBe(SwaggerDummy.openapi)
  })

  it('should have the correct API title', () => {
    expect(SwaggerDocumention.info.title).toBe(SwaggerDummy.info.title)
  })

  it('should have the correct API version', () => {
    expect(SwaggerDocumention.info.version).toBe(SwaggerDummy.info.version)
  })

  it('should have paths defined', () => {
    expect(SwaggerDocumention.paths).toEqual({})
  })
})

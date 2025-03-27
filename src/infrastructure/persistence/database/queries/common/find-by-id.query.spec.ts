import { IdentifierMock } from '@mocks/common'
import { FindByIdQuery } from './find-by-id.query'

describe('[Queries] Find By Id Query', () => {
  it('should return a query object with the correct id', () => {
    const parameter = { id: IdentifierMock }
    const query = FindByIdQuery(parameter)
    expect(query).toEqual({
      where: {
        id: IdentifierMock
      }
    })
  })

  it('should handle undefined parameter', () => {
    const parameter = {}
    const query = FindByIdQuery(parameter)
    expect(query).toEqual({
      where: {
        id: undefined
      }
    })
  })

  it('should handle null parameter', () => {
    const parameter = { id: null }
    const query = FindByIdQuery(parameter)
    expect(query).toEqual({
      where: {
        id: null
      }
    })
  })
})

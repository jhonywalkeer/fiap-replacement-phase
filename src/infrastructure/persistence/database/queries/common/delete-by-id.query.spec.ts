import { IdentifierMock } from '@mocks/common'
import { DeleteByIdQuery } from './delete-by-id.query'

describe('[Queries] Delete By Id Query', () => {
  it('should return a query object with the correct id', () => {
    const parameter = { id: IdentifierMock }
    const query = DeleteByIdQuery(parameter)
    expect(query).toEqual({
      where: {
        id: IdentifierMock
      }
    })
  })

  it('should handle undefined parameter', () => {
    const parameter = {}
    const query = DeleteByIdQuery(parameter)
    expect(query).toEqual({
      where: {
        id: undefined
      }
    })
  })

  it('should handle null parameter', () => {
    const parameter = { id: null }
    const query = DeleteByIdQuery(parameter)
    expect(query).toEqual({
      where: {
        id: null
      }
    })
  })
})

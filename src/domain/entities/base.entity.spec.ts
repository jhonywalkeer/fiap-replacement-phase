import { IdentifierMock } from '@mocks/common'
import { BaseEntity } from './base.entity'

describe('[Entities] Base Entity', () => {
  it('should create an instance with given values', () => {
    const id = IdentifierMock
    const createdAt = new Date()
    const updatedAt = new Date()
    const entity = new BaseEntity(id, createdAt, updatedAt)

    expect(entity.id).toBe(id)
    expect(entity.created_at).toBe(createdAt)
    expect(entity.updated_at).toBe(updatedAt)
  })

  it('should create an instance with null updated if not provided', () => {
    const id = IdentifierMock
    const createdAt = new Date()
    const entity = new BaseEntity(id, createdAt)

    expect(entity.id).toBe(id)
    expect(entity.created_at).toBe(createdAt)
    expect(entity.updated_at).toBeNull()
  })
})

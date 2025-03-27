import { IdentifierMock } from '@mocks/common'
import { UUIDGenerator } from './uuid.generator'
import { v7 as uuidv7 } from 'uuid'

jest.mock('uuid')

describe('[Generators] UUID Generator', () => {
  it('should generate a UUID using uuidv7', () => {
    const mockUUID = IdentifierMock
    ;(uuidv7 as jest.Mock).mockReturnValue(mockUUID)

    const result = UUIDGenerator()

    expect(result).toBe(mockUUID)
    expect(uuidv7).toHaveBeenCalledTimes(1)
  })
})

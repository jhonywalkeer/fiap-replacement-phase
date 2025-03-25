import { IdentifierMock } from '@mocks/common'
import { CreateClientMock } from '@mocks/client'

export const FindedClientByConditionMock = {
  id: IdentifierMock,
  ...CreateClientMock,
  created_at: new Date(),
  updated_at: new Date()
}

import { IdentifierMock } from '@mocks/common'
import { InputClientMock } from '@mocks/client'

export const UpdateClientMock = {
  id: IdentifierMock,
  ...InputClientMock,
  created_at: new Date(),
  updated_at: new Date()
}

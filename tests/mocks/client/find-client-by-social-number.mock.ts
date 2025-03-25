import { CreateClientMock, SocialNumberMock } from '@mocks/client'
import { IdentifierMock } from '@mocks/common'

export const SocialNumberWithKeyMock = {
  social_security_number: SocialNumberMock
}

export const FindClientBySocialNumberMock = SocialNumberWithKeyMock

export const FindedClientBySocialNumberMock = {
  id: IdentifierMock,
  ...CreateClientMock,
  created_at: new Date(),
  updated_at: new Date()
}

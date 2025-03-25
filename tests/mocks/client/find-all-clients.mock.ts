import { IdentifierMock } from '@mocks/common'
import { FindedClientByIdMock } from './find-client-by-id.mock'
import { SocialNumberWithSymbolMock } from './create-client.mock'

export const FindAllClientsMock = [
  [
    FindedClientByIdMock,
    {
      id: IdentifierMock,
      name: 'Usuario de Teste 2',
      social_security_number: SocialNumberWithSymbolMock,
      mail: 'usuario2@gmail.com',
      birth_date: '1999-07-06T01:00:00.000Z',
      create_at: new Date(),
      update_at: new Date()
    }
  ],
  2
]

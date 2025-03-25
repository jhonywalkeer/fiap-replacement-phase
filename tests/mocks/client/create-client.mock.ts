import { IdentifierMock } from '@mocks/common'

export const SocialNumberWithSymbolMock = '299.911.620-97'

export const SocialNumberMock = '29991162097'

export const InvalidSocialNumberMock = '22222222222'

export const ClientMailMock = 'usuario@gmail.com'

export const InvalidClientMailMock = 'usuario@teste.com'

export const InputClientMock = {
  name: 'Usuario de Teste',
  social_security_number: SocialNumberWithSymbolMock,
  mail: ClientMailMock,
  birth_date: '1999-07-06T01:00:00.000Z'
}

export const CreateClientMock = InputClientMock

export const CreatedClientMock = {
  id: IdentifierMock,
  ...CreateClientMock,
  created_at: new Date(),
  updated_at: new Date()
}

export enum ErrorMessage {
  SomethingWrong = 'Um erro inesperado aconteceu',
  DatabaseError = 'Não foi possível conectar com o banco de dados! Aplicação esta sendo finalizada',
  RateLimit = 'Muitas solicitações simultâneas, tente novamente mais tarde!',
  UnderAge = 'Usuário é menor de idade!',
  MailDomain = 'Email não pertence a um domínio válido!',
  SocialNumber = 'CPF inválido!',
  VehicleValue = 'Valor do veículo informado é divergente do preço original!'
}

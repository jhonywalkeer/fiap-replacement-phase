export const Pattern = {
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  Decimal: /^\d+\.\d{2}$/,
  Date: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
  SocialNumber: /^(\d)\1{10}$/,
  LegalAge: 18,
  MailValid: '@',
  MailsDomains: [
    '@gmail.com',
    '@hotmail.com',
    '@yahoo.com',
    '@outlook.com',
    '@live.com',
    '@fiap.com.br'
  ]
}

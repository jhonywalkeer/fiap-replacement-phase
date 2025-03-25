import { Client } from './client.interface'

export type UpdateClient = {
  id: Client['id']
  name?: Client['name']
  social_security_number?: Client['social_security_number']
  mail?: Client['mail']
  birth_date?: Client['birth_date']
}

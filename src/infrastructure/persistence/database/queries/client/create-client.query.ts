import { CreateClient } from '@domain/interfaces/client'

export const CreateClientQuery = (input: CreateClient) => {
  return {
    data: {
      name: input.name,
      mail: input.mail,
      social_security_number: input.social_security_number,
      birth_date: input.birth_date
    }
  }
}

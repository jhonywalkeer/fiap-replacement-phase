import { UpdateClient } from '@domain/interfaces/client'

export const UpdateClientQuery = (input: UpdateClient) => {
  return {
    where: {
      id: input.id
    },
    data: {
      name: input.name,
      mail: input.mail,
      social_security_number: input.social_security_number,
      birth_date: input.birth_date
    }
  }
}

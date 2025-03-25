import { FindClientByCondition } from '@domain/interfaces'

export const FindClientByConditionQuery = (
  parameter: FindClientByCondition
) => {
  return {
    where: {
      name: parameter.name,
      mail: parameter.mail,
      social_security_number: parameter.social_security_number,
      birth_date: parameter.birth_date
    }
  }
}

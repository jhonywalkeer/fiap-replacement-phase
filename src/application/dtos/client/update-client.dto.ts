import { IdentifierDTO } from '@application/dtos/common'
import {
  IsDate,
  IsLegalAge,
  IsMail,
  IsSocialSecurityNumber,
  IsString
} from '@presentation/validators'
import { Field } from '@domain/enums'

export class UpdateClientDTO extends IdentifierDTO {
  name?: string
  social_security_number?: string
  mail?: string
  birth_date?: Date

  constructor(
    id: string,
    name?: string,
    social_security_number?: string,
    mail?: string,
    birth_date?: Date
  ) {
    super(id)
    this.name = name ? IsString(name, Field.ClientName) : undefined
    this.social_security_number = social_security_number
      ? IsSocialSecurityNumber(
          IsString(social_security_number, Field.SocialSecurityNumber)
        )
      : undefined
    this.mail = mail ? IsMail(mail) : undefined
    this.birth_date = birth_date
      ? IsLegalAge(IsDate(birth_date, Field.BirthDate))
      : undefined
  }
}

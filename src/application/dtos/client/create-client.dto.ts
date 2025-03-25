import { IncorrectType } from '@common/enums'
import { Field } from '@domain/enums'
import {
  IsDate,
  IsLegalAge,
  IsMail,
  IsProvided,
  IsSocialSecurityNumber,
  IsString
} from '@presentation/validators'

export class CreateClientDTO {
  name: string
  social_security_number: string
  mail: string
  birth_date: Date

  constructor(
    name: string,
    social_security_number: string,
    mail: string,
    birth_date: Date
  ) {
    IsProvided(IncorrectType.Field, name, Field.ClientName)
    IsProvided(
      IncorrectType.Field,
      social_security_number,
      Field.SocialSecurityNumber
    )
    IsProvided(IncorrectType.Field, mail, Field.Mail)
    IsProvided(IncorrectType.Field, birth_date, Field.BirthDate)

    this.name = IsString(name, Field.ClientName)
    this.social_security_number = IsSocialSecurityNumber(
      IsString(social_security_number, Field.SocialSecurityNumber)
    )
    this.mail = IsMail(IsString(mail, Field.Mail))
    this.birth_date = IsLegalAge(IsDate(birth_date, Field.BirthDate))
  }
}

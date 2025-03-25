import { IncorrectType } from '@common/enums'
import { Field } from '@domain/enums'
import {
  IsProvided,
  IsSocialSecurityNumber,
  IsString
} from '@presentation/validators'

export class FindClientBySocialNumberDTO {
  social_security_number: string

  constructor(social_security_number: string) {
    IsProvided(
      social_security_number,
      Field.SocialSecurityNumber,
      IncorrectType.Param
    )

    this.social_security_number = IsSocialSecurityNumber(
      IsString(
        social_security_number,
        Field.SocialSecurityNumber,
        IncorrectType.Param
      )
    )
  }
}

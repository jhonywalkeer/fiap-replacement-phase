import { IncorrectType } from '@common/enums'
import { Field } from '@domain/enums'
import { IsProvided, IsUUID } from '@presentation/validators'

export class IdentifierDTO {
  id: string

  constructor(id: string) {
    IsProvided(IncorrectType.Param, id, Field.Id)

    this.id = IsUUID(id, Field.Id)
  }
}

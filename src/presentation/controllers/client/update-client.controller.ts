import { UpdateClientDTO } from '@application/dtos/client'
import { Controller, ResponseHandler } from '@application/protocols'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { ClientEntity } from '@domain/entities'
import { UpdateClientUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class UpdateClientController implements Controller<any> {
  private readonly method: string = '[UpdateClientController]'
  constructor(
    private readonly updateClientUC: UpdateClientUseCase,
    private readonly updateClientPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<any>> {
    Logger.info(`${this.method}.handle`)

    const { id } = request.params
    const { name, social_security_number, mail, birth_date } = request.body
    const payload = Object.assign(
      new UpdateClientDTO(id, name, social_security_number, mail, birth_date)
    )
    const client: ClientEntity = await this.updateClientUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Created}`)

    return this.updateClientPresenter.response(
      { data: client },
      StatusCode.Created
    )
  }
}

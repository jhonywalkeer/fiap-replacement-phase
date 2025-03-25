import { FindClientBySocialNumberDTO } from '@application/dtos/client'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { ClientEntity } from '@domain/entities'
import { FindClientBySocialNumberUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class FindClientBySocialNumberController
  implements Controller<ClientEntity>
{
  private readonly method: string = '[FindClientByIdController]'
  constructor(
    private readonly findClientByIdUC: FindClientBySocialNumberUseCase,
    private readonly findClientByIdPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ClientEntity>> {
    Logger.info(`${this.method}.handle`)

    const { social_number } = request.params
    const payload = Object.assign(
      new FindClientBySocialNumberDTO(social_number)
    )
    const client: ClientEntity = await this.findClientByIdUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Sucess}`)

    return this.findClientByIdPresenter.response(
      { data: client },
      StatusCode.Sucess
    )
  }
}

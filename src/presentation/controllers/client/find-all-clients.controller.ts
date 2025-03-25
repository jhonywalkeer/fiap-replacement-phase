import { FindAllClientsDTO } from '@application/dtos/client/find-all-clients.dto'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { ClientEntity } from '@domain/entities'
import { FindAllClientsUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class FindAllClientsController implements Controller<ClientEntity> {
  private readonly method: string = '[FindAllClientsController]'
  constructor(
    private readonly findAllClientsUC: FindAllClientsUseCase,
    private readonly findAllClientsPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ClientEntity>> {
    Logger.info(`${this.method}.handle`)

    const { query } = request
    const payload = Object.assign(
      new FindAllClientsDTO(
        query.page,
        query.limit,
        query.sort,
        query.order,
        query.filter,
        query.value
      )
    )
    const [vehicle, total] = await this.findAllClientsUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Sucess}`)

    return this.findAllClientsPresenter.response(
      {
        page: payload.page,
        limit: payload.limit,
        total: total,
        total_pages: Math.ceil(total / payload.limit),
        data: vehicle
      },
      StatusCode.Sucess
    )
  }
}

import { CreateClientDTO } from '@application/dtos/client'
import { Controller, ResponseHandler } from '@application/protocols'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { CreateClientUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class CreateClientController implements Controller<any> {
  private readonly method: string = '[CreateClientController]'
  constructor(
    private readonly createClientUC: CreateClientUseCase,
    private readonly createClientPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<any>> {
    Logger.info(`${this.method}.handle`)

    const { name, social_security_number, mail, birth_date } = request.body
    const payload = Object.assign(
      new CreateClientDTO(name, social_security_number, mail, birth_date)
    )
    const client = await this.createClientUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Created}`)

    return this.createClientPresenter.response(
      { data: client },
      StatusCode.Created
    )
  }
}

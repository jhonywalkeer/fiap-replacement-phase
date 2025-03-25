import { DeleteClientDTO } from '@application/dtos/client'
import { Controller, ResponseHandler } from '@application/protocols'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { DeleteClientUseCase } from '@domain/usecases/client'
import { Logger } from '@infrastructure/logging'

export class DeleteClientController implements Controller<void> {
  private readonly method: string = '[DeleteClientController]'
  constructor(
    private readonly deleteClientUC: DeleteClientUseCase,
    private readonly deleteClientPresenter: ResponseHandler<void>
  ) {}

  async handle(request: HttpRequest) {
    Logger.info(`${this.method}.handle`)

    const { id } = request.params
    const payload: DeleteClientDTO = Object.assign(new DeleteClientDTO(id))
    const deleteClient: void = await this.deleteClientUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Accepted}`)

    return this.deleteClientPresenter.response(
      deleteClient,
      StatusCode.Accepted
    )
  }
}

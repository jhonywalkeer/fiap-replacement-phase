import { DeleteVehicleDTO } from '@application/dtos/vehicle'
import { Controller, ResponseHandler } from '@application/protocols'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { DeleteVehicleUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class DeleteVehicleController implements Controller<void> {
  private readonly method: string = '[DeleteVehicleController]'
  constructor(
    private readonly deleteVehicleUC: DeleteVehicleUseCase,
    private readonly deleteVehiclePresenter: ResponseHandler<void>
  ) {}

  async handle(request: HttpRequest) {
    Logger.info(`${this.method}.handle`)

    const { id } = request.params
    const payload: DeleteVehicleDTO = Object.assign(new DeleteVehicleDTO(id))
    const deleteVehicle: void = await this.deleteVehicleUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Accepted}`)

    return this.deleteVehiclePresenter.response(
      deleteVehicle,
      StatusCode.Accepted
    )
  }
}

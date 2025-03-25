import { UpdateVehicleDTO } from '@application/dtos/vehicle'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { VehicleEntity } from '@domain/entities'
import { UpdateVehicleUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class UpdateVehicleController implements Controller<VehicleEntity> {
  private readonly method: string = '[UpdateVehicleController]'
  constructor(
    private readonly updateVehicleUC: UpdateVehicleUseCase,
    private readonly updateVehiclePresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<VehicleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { id } = request.params
    const { brand, model, fuel, year, color, price, status } = request.body
    const payload = Object.assign(
      new UpdateVehicleDTO(id, brand, model, fuel, year, color, price, status)
    )
    const vehicle: VehicleEntity = await this.updateVehicleUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Created}`)

    return this.updateVehiclePresenter.response(
      { data: vehicle },
      StatusCode.Created
    )
  }
}

import { CreateVehicleDTO } from '@application/dtos/vehicle'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { VehicleEntity } from '@domain/entities'
import { CreateVehicleUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class CreateVehicleController implements Controller<VehicleEntity> {
  private readonly method: string = '[CreateVehicleController]'
  constructor(
    private readonly createVehicleUC: CreateVehicleUseCase,
    private readonly createVehiclePresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<VehicleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { brand, model, fuel, year, color, price, status } = request.body
    const payload = Object.assign(
      new CreateVehicleDTO(brand, model, fuel, year, color, price, status)
    )
    const vehicle: VehicleEntity = await this.createVehicleUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Created}`)

    return this.createVehiclePresenter.response(
      { data: vehicle },
      StatusCode.Created
    )
  }
}

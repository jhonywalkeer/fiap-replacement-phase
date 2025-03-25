import { FindVehicleByIdDTO } from '@application/dtos/vehicle'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { VehicleEntity } from '@domain/entities'
import { FindVehicleByIdUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class FindVehicleByIdController implements Controller<VehicleEntity> {
  private readonly method: string = '[FindVehicleByIdController]'
  constructor(
    private readonly findVehicleByIdUC: FindVehicleByIdUseCase,
    private readonly findVehicleByIdPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<VehicleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { id } = request.params
    const payload = Object.assign(new FindVehicleByIdDTO(id))
    const vehicle: VehicleEntity = await this.findVehicleByIdUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Sucess}`)

    return this.findVehicleByIdPresenter.response(
      { data: vehicle },
      StatusCode.Sucess
    )
  }
}

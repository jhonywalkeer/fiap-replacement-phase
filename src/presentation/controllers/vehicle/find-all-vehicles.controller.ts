import { FindAllVehiclesDTO } from '@application/dtos/vehicle'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { VehicleEntity } from '@domain/entities'
import { FindAllVehiclesUseCase } from '@domain/usecases/vehicle'
import { Logger } from '@infrastructure/logging'

export class FindAllVehicleController implements Controller<VehicleEntity> {
  private readonly method: string = '[FindAllVehicleController]'
  constructor(
    private readonly FindAllVehiclesUC: FindAllVehiclesUseCase,
    private readonly findAllVehiclePresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<VehicleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { query } = request
    const payload = Object.assign(
      new FindAllVehiclesDTO(
        query.page,
        query.limit,
        query.sort,
        query.order,
        query.filter,
        query.value
      )
    )
    const [vehicle, total] = await this.FindAllVehiclesUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Sucess}`)

    return this.findAllVehiclePresenter.response(
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

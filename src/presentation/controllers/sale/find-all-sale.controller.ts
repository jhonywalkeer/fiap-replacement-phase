import { FindAllSalesDTO } from '@application/dtos/sale'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { SaleEntity } from '@domain/entities'
import { FindAllSalesUseCase } from '@domain/usecases/sale'
import { Logger } from '@infrastructure/logging'

export class FindAllSalesController implements Controller<SaleEntity> {
  private readonly method: string = '[FindAllSalesController]'
  constructor(
    private readonly findAllSalesUC: FindAllSalesUseCase,
    private readonly findAllSalesPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<SaleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { query } = request
    const payload = Object.assign(
      new FindAllSalesDTO(
        query.page,
        query.limit,
        query.sort,
        query.order,
        query.filter,
        query.value
      )
    )
    const [vehicle, total] = await this.findAllSalesUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Sucess}`)

    return this.findAllSalesPresenter.response(
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

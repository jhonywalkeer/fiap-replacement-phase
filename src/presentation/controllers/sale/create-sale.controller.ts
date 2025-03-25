import { CreateSaleDTO } from '@application/dtos/sale'
import { Controller, ResponseHandler } from '@application/protocols'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { SaleEntity } from '@domain/entities'
import { CreateSaleUseCase } from '@domain/usecases/sale'
import { Logger } from '@infrastructure/logging'

export class CreateSaleController implements Controller<SaleEntity> {
  private readonly method: string = '[CreateSaleController]'
  constructor(
    private readonly createSaleUC: CreateSaleUseCase,
    private readonly createSalePresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<SaleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { vehicle_id, buyer_id, sale_date, payment_id } = request.body
    const payload = Object.assign(
      new CreateSaleDTO(vehicle_id, buyer_id, sale_date, payment_id)
    )
    const sale: SaleEntity = await this.createSaleUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Created}`)

    return this.createSalePresenter.response({ data: sale }, StatusCode.Created)
  }
}

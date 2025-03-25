import { FindSaleByIdDTO } from '@application/dtos/sale'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { SaleEntity } from '@domain/entities'
import { FindSaleByIdUseCase } from '@domain/usecases/sale'
import { Logger } from '@infrastructure/logging'

export class FindSaleByIdController implements Controller<SaleEntity> {
  private readonly method: string = '[FindSaleByIdController]'
  constructor(
    private readonly findSaleByIdUC: FindSaleByIdUseCase,
    private readonly findSaleByIdPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<SaleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { id } = request.params
    const payload = Object.assign(new FindSaleByIdDTO(id))
    const sale: SaleEntity = await this.findSaleByIdUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Sucess}`)

    return this.findSaleByIdPresenter.response(
      { data: sale },
      StatusCode.Sucess
    )
  }
}

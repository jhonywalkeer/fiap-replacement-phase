import { FindPaymentByIdDTO } from '@application/dtos/payment'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { PaymentWithSaleEntity } from '@domain/entities'
import { FindPaymentByIdUseCase } from '@domain/usecases/payment'
import { Logger } from '@infrastructure/logging'

export class FindPaymentByIdController
  implements Controller<PaymentWithSaleEntity>
{
  private readonly method: string = '[FindPaymentByIdController]'
  constructor(
    private readonly findPaymentByIdUC: FindPaymentByIdUseCase,
    private readonly findPaymentByIdPresenter: ResponseHandler<any>
  ) {}

  async handle(
    request: HttpRequest
  ): Promise<HttpResponse<PaymentWithSaleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { id } = request.params
    const payload = Object.assign(new FindPaymentByIdDTO(id))
    const payment: PaymentWithSaleEntity =
      await this.findPaymentByIdUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Sucess}`)

    return this.findPaymentByIdPresenter.response(
      { data: payment },
      StatusCode.Sucess
    )
  }
}

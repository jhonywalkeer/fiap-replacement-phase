import { UpdatePaymentDTO } from '@application/dtos/payment'
import { Controller, ResponseHandler } from '@application/protocols'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { PaymentWithSaleEntity } from '@domain/entities'
import { UpdatePaymentUseCase } from '@domain/usecases/payment'
import { Logger } from '@infrastructure/logging'

export class UpdatePaymentWebhookController
  implements Controller<PaymentWithSaleEntity>
{
  private readonly method: string = '[UpdatePaymentWebhookController]'
  constructor(
    private readonly updatePaymentUC: UpdatePaymentUseCase,
    private readonly updatePaymentPresenter: ResponseHandler<any>
  ) {}

  async handle(
    request: HttpRequest
  ): Promise<HttpResponse<PaymentWithSaleEntity>> {
    Logger.info(`${this.method}.handle`)

    const { payment_id, status, reason } = request.body
    const payload = Object.assign(
      new UpdatePaymentDTO(payment_id, status, reason)
    )
    const payment: PaymentWithSaleEntity =
      await this.updatePaymentUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Created}`)

    return this.updatePaymentPresenter.response(
      { data: payment },
      StatusCode.Created
    )
  }
}

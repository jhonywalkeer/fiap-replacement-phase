import { CreatePaymentDTO } from '@application/dtos/payment'
import { Controller, ResponseHandler } from '@application/protocols'
import { StatusCode } from '@common/enums'
import { HttpRequest, HttpResponse } from '@common/interfaces'
import { CreatePaymentUseCase } from '@domain/usecases/payment'
import { Logger } from '@infrastructure/logging'

export class CreatePaymentController implements Controller<any> {
  private readonly method: string = '[CreatePaymentController]'
  constructor(
    private readonly createPaymentUC: CreatePaymentUseCase,
    private readonly createPaymentPresenter: ResponseHandler<any>
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<any>> {
    Logger.info(`${this.method}.handle`)

    const { sale_id, amount, payment_method, card } = request.body
    const payload = Object.assign(
      new CreatePaymentDTO(sale_id, amount, payment_method, card)
    )
    const payment = await this.createPaymentUC.execute(payload)

    Logger.info(`${this.method} | Status Code ${StatusCode.Created}`)

    return this.createPaymentPresenter.response(
      { data: payment },
      StatusCode.Created
    )
  }
}

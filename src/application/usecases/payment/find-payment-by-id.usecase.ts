import { FindPaymentByIdRepository } from '@application/repositories/payment'
import { NotFoundError } from '@common/errors'
import { PaymentWithSaleEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindPaymentById } from '@domain/interfaces/payment'
import { FindPaymentByIdUseCase } from '@domain/usecases/payment'
import { Logger } from '@infrastructure/logging'

export class FindPaymentByIdUC implements FindPaymentByIdUseCase {
  private readonly method: string = '[FindPaymentByIdUC]'

  constructor(private readonly findPaymentById: FindPaymentByIdRepository) {}

  async execute(payload: FindPaymentById): Promise<any> {
    Logger.info(`${this.method}.execute`)

    const findPayment: PaymentWithSaleEntity | null =
      await this.findPaymentById.findById(payload)

    if (!findPayment) {
      throw new NotFoundError(Field.Payment)
    }

    return findPayment
  }
}

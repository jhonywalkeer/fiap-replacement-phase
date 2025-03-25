import { CreatePaymentExternal } from '@domain/interfaces'
import { Logger } from '@infrastructure/logging'
import { ExternalPaymentProvider } from '@infrastructure/providers'
import { PaymentStatus } from '@prisma/client'

export type Payment = {
  status: PaymentStatus
  reason: string | null
}

export interface PaymentExternalGateway {
  create(order: CreatePaymentExternal): Promise<Payment>
}

export class PaymentExternal implements PaymentExternalGateway {
  private readonly method: string = '[PaymentExternal]'
  constructor(
    private readonly externalPayment = new ExternalPaymentProvider()
  ) {}

  public async create(input: CreatePaymentExternal): Promise<Payment> {
    try {
      Logger.info(`${this.method}.create`)
      return await this.externalPayment.payment(input)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

import { CreatePayment } from '@domain/interfaces'

export interface CreatePaymentUseCase {
  execute(payload: CreatePayment): Promise<any> | never
}

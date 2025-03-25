import { FindPaymentById } from '@domain/interfaces/payment'

export const FindPaymentByIdQuery = (parameter: FindPaymentById) => {
  return {
    where: { id: parameter.id },
    include: {
      sale: true
    }
  }
}

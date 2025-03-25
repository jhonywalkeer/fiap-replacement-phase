import { ExpressRouteAdapter } from '@main/adapters/framework'
import { CreatePaymentControllerFactory } from '@main/factories/payment'
import { FindPaymentByIdControllerFactory } from '@main/factories/payment/find-payment-by-id.factory'
import { Router } from 'express'

export const PaymentRoute = Router()

const { createPaymentController } = CreatePaymentControllerFactory()
const { findPaymentByIdController } = FindPaymentByIdControllerFactory()

PaymentRoute.post('/', ExpressRouteAdapter(createPaymentController)).get(
  '/:id',
  ExpressRouteAdapter(findPaymentByIdController)
)

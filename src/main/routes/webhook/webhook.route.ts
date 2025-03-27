import { ExpressRouteAdapter } from '@main/adapters/framework'
import { UpdatePaymentWebhookControllerFactory } from '@main/factories/webhook'
import { Router } from 'express'

export const WebhookRoute = Router()
const { updatePaymentWebhookController } =
  UpdatePaymentWebhookControllerFactory()

WebhookRoute.put(
  '/payments',
  ExpressRouteAdapter(updatePaymentWebhookController)
)

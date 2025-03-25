import { ServerConfig } from '@common/constants'
import {
  HealthCheckRoute,
  SaleRoute,
  VehicleRoute,
  ClientRoute,
  PaymentRoute,
  WebhookRoute
} from '@main/routes'

export const routes = [
  {
    path: `${ServerConfig.ApiVersion}/health`,
    handler: HealthCheckRoute
  },
  {
    path: `${ServerConfig.ApiVersion}/vehicles`,
    handler: VehicleRoute
  },
  {
    path: `${ServerConfig.ApiVersion}/sales`,
    handler: SaleRoute
  },
  {
    path: `${ServerConfig.ApiVersion}/clients`,
    handler: ClientRoute
  },
  { path: `${ServerConfig.ApiVersion}/payments`, handler: PaymentRoute },
  { path: `${ServerConfig.ApiVersion}/webhooks`, handler: WebhookRoute }
]

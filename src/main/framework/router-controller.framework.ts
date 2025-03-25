import { ServerConfig } from '@common/constants'
import { Environment } from '@common/enums'
import { Logger } from '@infrastructure/logging'
import { SwaggerDocumention } from '@main/framework'
import { routes } from '@main/routes'
import { Application } from 'express'
import { serve, setup } from 'swagger-ui-express'

export const RouterFramework = (framework: Application): void => {
  routes.forEach((route) => {
    framework.use(route.path, route.handler)

    if (process.env.NODE_ENV === Environment.Local) {
      framework.use(
        `${ServerConfig.ApiVersion}${ServerConfig.DocumentationRoute}`,
        serve,
        setup(SwaggerDocumention)
      )
    }
    Logger.info(`Rota ${route.path} registrada com sucesso!`)
  })
}

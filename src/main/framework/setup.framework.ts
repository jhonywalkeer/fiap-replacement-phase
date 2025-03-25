import 'tsconfig-paths/register'
import { ServerConfig } from '@common/constants'
import { Check, Environment, ErrorMessage } from '@common/enums'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  SetupAsyncErrors,
  SetupGlobalMiddlewares,
  RouterFramework
} from '@main/framework'
import express, { Express } from 'express'

require('dotenv').config()

export const SetupFramework = async (): Promise<void> => {
  const port: number =
    process.env.PORT && !isNaN(+process.env.PORT)
      ? +process.env.PORT
      : +ServerConfig.Port

  if (isNaN(port) || port < 0 || port > 65535) {
    Logger.error(
      'A porta especificada é inválida. Verifique a variável de ambiente PORT.'
    )
    process.exit(Check.True)
  }
  const host: string = ServerConfig.Host
  const framework: Express = express()
  const database: DatabaseConnection = new DatabaseConnection()
  const isDbConnected: boolean = await database.isConnected()
  const documentation: string = `${ServerConfig.ApiVersion}${ServerConfig.DocumentationRoute}`

  if (!isDbConnected) {
    Logger.error(ErrorMessage.DatabaseError)
    process.exit(Check.True)
  }

  SetupGlobalMiddlewares(framework)
  RouterFramework(framework)
  SetupAsyncErrors(framework)

  framework.listen(port, host, () => {
    Logger.info('Banco de dados conectado com sucesso!')
    Logger.info(`API executando na versão v1`)

    if (process.env.NODE_ENV === Environment.Local) {
      Logger.info(`Documentação disponível em ${documentation}`)
    }
  })

  process.on('unhandledRejection', (reason) => {
    console.error('[Unhandled Rejection]', reason)
  })

  process.on('uncaughtException', (error) => {
    console.error('[Uncaught Exception]', error)
    process.exit(Check.True) // Finaliza o processo com erro controlado
  })
}

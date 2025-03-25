import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { RateLimiter } from '@presentation/middlewares'
import { ServerConfig } from '@common/constants'

export const SetupGlobalMiddlewares = (framework: Application): void => {
  const rateLimiter: RateLimiter = new RateLimiter(ServerConfig.RateLimitConfig)

  framework.use(helmet())
  framework.use(cors())
  framework.use(rateLimiter.handle.bind(rateLimiter))
  framework.use(express.json())
}

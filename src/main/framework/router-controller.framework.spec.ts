import { ServerConfig } from '@common/constants'
import { Logger } from '@infrastructure/logging'
import { RouterFramework } from '@main/framework'
import { HealthCheckRoute } from '@main/routes'
import { Application } from 'express'

describe('[Framework] Router Framework', () => {
  let app: Application

  beforeEach(() => {
    app = {
      use: jest.fn()
    } as unknown as Application

    jest.spyOn(Logger, 'info').mockImplementation(jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register routes correctly', () => {
    RouterFramework(app)

    expect(app.use).toHaveBeenCalledWith(
      `${ServerConfig.ApiVersion}/health`,
      HealthCheckRoute
    )
  })

  it('should log route registration', () => {
    RouterFramework(app)

    expect(Logger.info).toHaveBeenCalledWith(
      'Rota /api/v1/health registrada com sucesso!'
    )
  })
})

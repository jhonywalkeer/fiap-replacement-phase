import { HealthCheckMap } from '@application/mappers'
import { ApplicationStatus } from '@common/enums'
import { HealthCheck } from '@domain/interfaces/health-check'
import { HealthCheckUseCase } from '@domain/usecases/health-check'
import { Logger } from '@infrastructure/logging'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class HealthCheckUC implements HealthCheckUseCase {
  private readonly method: string = '[HealthCheckUC.execute]'
  constructor(private readonly checkConnection: DatabaseConnection) {}

  async execute(): Promise<HealthCheck> {
    Logger.info(`${this.method}`)

    const healthCheck: boolean = await this.checkConnection.isConnected()
    let dbStatus = ApplicationStatus.Down
    let api = ApplicationStatus.Down

    if (healthCheck) {
      dbStatus = ApplicationStatus.Up
      api = ApplicationStatus.Up
    }

    return HealthCheckMap.execute(api, dbStatus)
  }
}

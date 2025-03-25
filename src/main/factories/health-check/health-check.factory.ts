import { HealthCheckUC } from '@application/usecases/health-check'
import { HealthCheck } from '@domain/interfaces/health-check'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { HttpGenericResponseAdapter } from '@main/adapters/http'
import { HealthCheckController } from '@presentation/controllers/health-check'

export const HealthCheckControllerFactory = () => {
  const databaseConnection: DatabaseConnection = new DatabaseConnection()
  const healthCheckUseCase: HealthCheckUC = new HealthCheckUC(
    databaseConnection
  )
  const genericSucessPresenter: HttpGenericResponseAdapter<HealthCheck> =
    new HttpGenericResponseAdapter<HealthCheck>()
  const healthCheckController: HealthCheckController =
    new HealthCheckController(healthCheckUseCase, genericSucessPresenter)

  return {
    databaseConnection,
    healthCheckUseCase,
    healthCheckController
  }
}

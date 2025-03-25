import { Controller, ResponseHandler } from '@application/protocols/http'
import { ApplicationStatus, StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { HealthCheck } from '@domain/interfaces/health-check'
import { HealthCheckUseCase } from '@domain/usecases/health-check'
import { Logger } from '@infrastructure/logging'

export class HealthCheckController implements Controller<HealthCheck> {
  private readonly method: string = '[HealthCheckController]'
  constructor(
    private readonly healthCheckUC: HealthCheckUseCase,
    private readonly healthCheckPresenter: ResponseHandler<HealthCheck>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info(`${this.method}.handle`, request.params)

    const healthCheck: HealthCheck = await this.healthCheckUC.execute()
    return this.healthCheckPresenter.response(
      healthCheck,
      healthCheck.status === ApplicationStatus.Up
        ? StatusCode.Sucess
        : StatusCode.ServiceUnavailable
    )
  }
}

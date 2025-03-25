import { HealthCheckStatus } from './health-check-status.interface'

export interface HealthCheck extends HealthCheckStatus {
  api: HealthCheckStatus
  database: HealthCheckStatus
}

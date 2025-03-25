export interface ICircuitBreaker {
  fire<T>(fn: () => Promise<T>): Promise<T>
}

export enum CircuitBreakerState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  HALF_OPEN = 'HALF_OPEN'
}

export class CircuitBreaker implements ICircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED
  private failureCount = 0
  private failureThreshold: number
  private resetTimeout: number
  private nextAttempt = Date.now()

  constructor(options?: { failureThreshold?: number; resetTimeout?: number }) {
    this.failureThreshold = options?.failureThreshold ?? 5 // 5 failures
    this.resetTimeout = options?.resetTimeout ?? 5000 // 5 seconds
  }

  async fire<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitBreakerState.OPEN) {
      if (Date.now() >= this.nextAttempt) {
        this.state = CircuitBreakerState.HALF_OPEN
      } else {
        throw new Error('Circuit Breaker is OPEN. Try again later.')
      }
    }

    try {
      const result = await fn()
      this.success()
      return result
    } catch (error) {
      this.failure()
      throw error
    }
  }

  private success() {
    this.failureCount = 0
    if (this.state === CircuitBreakerState.HALF_OPEN) {
      this.state = CircuitBreakerState.CLOSED
    }
  }

  private failure() {
    this.failureCount += 1
    if (this.failureCount >= this.failureThreshold) {
      this.state = CircuitBreakerState.OPEN
      this.nextAttempt = Date.now() + this.resetTimeout
    }
  }
}

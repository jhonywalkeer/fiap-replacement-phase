export interface RateLimitProps {
  requestCount: number
  startTime: number
}

export interface RateLimitOptions {
  windowMs: number // Intervalo de tempo para o limite, em milissegundos
  maxRequests: number // Máximo de requisições permitidas por intervalo
  message?: string // Mensagem de erro
}

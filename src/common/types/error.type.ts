import { HttpResponse } from '@common/interfaces'

export type ErrorParams = {
  name?: string
  message?: string
  statusCode?: number
  messages?: string[]
  stack?: Error['stack']
}

export type ErrorResponse = Omit<HttpResponse<ErrorParams>, 'body'>

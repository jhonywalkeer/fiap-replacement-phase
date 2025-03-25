import { Client } from './client.interface'

export type FindClientByCondition = Omit<
  Client,
  'id' | 'created_at' | 'updated_at'
>

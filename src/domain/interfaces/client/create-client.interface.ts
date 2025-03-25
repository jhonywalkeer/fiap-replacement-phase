import { Client } from './client.interface'

export type CreateClient = Omit<Client, 'id' | 'created_at' | 'updated_at'>

import { Sale } from './sale.interface'

export type CreateSale = Omit<Sale, 'id'>

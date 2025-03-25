import { Sale } from './sale.interface'

export type FindSaleByCondition = {
  vehicle_id: Sale['vehicle_id']
  buyer_id: Sale['buyer_id']
  payment_id: Sale['payment_id']
}

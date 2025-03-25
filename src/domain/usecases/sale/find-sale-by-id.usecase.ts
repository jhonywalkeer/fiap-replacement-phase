import { SaleEntity } from '@domain/entities'
import { FindSaleById } from '@domain/interfaces/sale'

export interface FindSaleByIdUseCase {
  execute(payload: FindSaleById): Promise<SaleEntity> | never
}

import { SaleEntity } from '@domain/entities'
import { CreateSale } from '@domain/interfaces/sale'

export interface CreateSaleUseCase {
  execute(payload: CreateSale): Promise<SaleEntity> | never
}

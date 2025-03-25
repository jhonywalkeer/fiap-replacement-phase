import { ExpressRouteAdapter } from '@main/adapters/framework'
import {
  CreateSaleControllerFactory,
  FindSaleByIdControllerFactory
} from '@main/factories/sale'
import { FindAllSalesControllerFactory } from '@main/factories/sale/find-all-sales.factory'
import { Router } from 'express'

export const SaleRoute = Router()

const { createSaleController } = CreateSaleControllerFactory()
const { findSaleByIdController } = FindSaleByIdControllerFactory()
const { findAllSalesController } = FindAllSalesControllerFactory()

SaleRoute.post('/', ExpressRouteAdapter(createSaleController))
SaleRoute.get('/', ExpressRouteAdapter(findAllSalesController))
SaleRoute.get('/:id', ExpressRouteAdapter(findSaleByIdController))

import { ExpressRouteAdapter } from '@main/adapters/framework'
import {
  CreateClientControllerFactory,
  DeleteClientControllerFactory,
  FindAllClientsControllerFactory,
  FindClientBySocialNumberControllerFactory
} from '@main/factories/client'
import { UpdateClientControllerFactory } from '@main/factories/client/update-client.factory'
import { Router } from 'express'

export const ClientRoute = Router()

const { createClientController } = CreateClientControllerFactory()
const { findAllClientController } = FindAllClientsControllerFactory()
const { findClientBySocialNumberController } =
  FindClientBySocialNumberControllerFactory()
const { deleteClientController } = DeleteClientControllerFactory()
const { updateClientController } = UpdateClientControllerFactory()

ClientRoute.post('/', ExpressRouteAdapter(createClientController))
  .get('/', ExpressRouteAdapter(findAllClientController))
  .get(
    '/:social_number',
    ExpressRouteAdapter(findClientBySocialNumberController)
  )
  .put('/:id', ExpressRouteAdapter(updateClientController))
  .patch('/:id', ExpressRouteAdapter(updateClientController))
  .delete('/:id', ExpressRouteAdapter(deleteClientController))

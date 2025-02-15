import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJwt } from '@/middleware/verifyJwt'
import { search } from './search'
import { filter } from './filter/schema'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', filter)

  app.get('/pets/:city', search)

  app.get('/pet/:id', details)

  app.post('/pets', { onRequest: [verifyJwt] } , register)
}
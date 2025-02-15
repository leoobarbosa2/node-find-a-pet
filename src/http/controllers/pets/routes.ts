import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJwt } from '@/middleware/verifyJwt'
import { search } from './search'
import { filter } from './filter/schema'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:city', search)

  app.get('/pets', filter)

  app.post('/pets', { onRequest: [verifyJwt] } , register)
}
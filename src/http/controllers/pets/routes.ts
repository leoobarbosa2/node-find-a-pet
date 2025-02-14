import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJwt } from '@/middleware/verifyJwt'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:city', search)

  app.post('/pets', { onRequest: [verifyJwt] } , register)
}
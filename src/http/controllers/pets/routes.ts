import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJwt } from '@/middleware/verifyJwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] } , register)
}
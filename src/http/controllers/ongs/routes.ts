import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function ongsRoutes(app: FastifyInstance) {
  app.post('/ongs', register)
}
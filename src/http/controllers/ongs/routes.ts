import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function ongsRoutes(app: FastifyInstance) {
  app.post('/ongs', register)

  app.post('/sessions', authenticate)

  app.post('/refresh-token', refresh)
}
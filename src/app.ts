import fastify from 'fastify'
import { ongsRoutes } from './http/controllers/ongs/routes'
import { errorHandler } from './http/handlers/error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from '@env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '5m',
  },
})

app.register(ongsRoutes)

app.setErrorHandler(errorHandler)
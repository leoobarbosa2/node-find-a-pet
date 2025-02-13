import fastify from 'fastify'
import { ongsRoutes } from './http/controllers/ongs/routes'
import { errorHandler } from './http/handlers/error-handler'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from '@env'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refresh_token',
    signed: false,
  },
  sign: {
    expiresIn: '5m',
  },
})
app.register(fastifyCookie)

app.register(ongsRoutes)
app.register(petsRoutes)

app.setErrorHandler(errorHandler)
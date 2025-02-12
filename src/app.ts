import fastify from 'fastify'
import { ongsRoutes } from './http/controllers/ongs/routes'
import { errorHandler } from './http/handlers/error-handler'

export const app = fastify()

app.register(ongsRoutes)

app.setErrorHandler(errorHandler)
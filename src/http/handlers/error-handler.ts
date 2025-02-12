import { env } from '@env'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export async function errorHandler(error: FastifyError, _: FastifyRequest, reply: FastifyReply){
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: External app data log like -> Datadog/Newrelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}
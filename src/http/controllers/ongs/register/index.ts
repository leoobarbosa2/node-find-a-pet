
import { FastifyReply, FastifyRequest } from 'fastify'
import { createOngUseCase } from '@/http/use-cases/factories/make-ong-use-case-factory'
import { registerOngBodySchema } from './schema'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, phone, address, city, country, state, zip_code, email, password } = registerOngBodySchema.parse(request.body)

  const createOngsUseCase = createOngUseCase()

  await createOngsUseCase.execute({ name, phone, address, city, country, state, zip_code, email, password })

  return reply.status(201).send()
}
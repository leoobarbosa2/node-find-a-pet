
import { FastifyReply, FastifyRequest } from 'fastify'
import { createOngUseCase } from '@/http/use-cases/factories/create-ong-use-case-factory'
import { createOngBodySchema } from './schema'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, phone, address, city, country, state, zip_code, email, password } = createOngBodySchema.parse(request.body)

  const createOngsUseCase = createOngUseCase()

  await createOngsUseCase.execute({ name, phone, address, city, country, state, zip_code, email, password })

  return reply.status(201).send()
}
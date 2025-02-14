import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchManyPets } from '@/http/use-cases/factories/make-fetch-many-pets-by-city'
import { searchPetsQuerySchema } from './schema'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const registerPetUseCase = makeFetchManyPets()

  const { city } = searchPetsQuerySchema.parse(request.params)

  const { petsByCity } = await registerPetUseCase.execute(city)

  return reply.status(200).send({ petsByCity })
}
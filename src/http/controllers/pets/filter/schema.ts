import { FastifyReply, FastifyRequest } from 'fastify'
import { filterPetsBodySchema } from '.'
import { makeFilterManyPets } from '@/http/use-cases/factories/make-filter-many-pets'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const { name, age, breed, dependency_level, environment, size, energy_level } = filterPetsBodySchema.parse(request.query) ?? {}
  console.log(name, age, breed, dependency_level, environment, size, energy_level)
  const fetchManyPetsUseCase = makeFilterManyPets()

  const { pets } = await fetchManyPetsUseCase.execute({ name, age, breed, dependency_level, environment, size, energy_level })

  return reply.status(200).send({ pets })
}
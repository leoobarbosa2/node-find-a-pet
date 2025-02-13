import { FastifyReply, FastifyRequest } from 'fastify'
import { registerPetBodySchema, registerPetQuerySchema } from './schema'
import { makeRegisterPets } from '@/http/use-cases/factories/make-pet-use-case-factory'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const {
    name,
    about,
    age,
    breed,
    dependency_level,
    energy_level,
    environment,
    adoption_requirements
    ,size,
  } = registerPetBodySchema.parse(request.body)

  const { ongId } = registerPetQuerySchema.parse(request.params)

  const registerPetUseCase = makeRegisterPets()

  await registerPetUseCase.execute({
    name,
    about,
    age,
    breed,
    dependency_level,
    energy_level,
    environment,
    ong_id: ongId,
    size,
    adoption_requirements,
  })

  return reply.status(201).send()
}
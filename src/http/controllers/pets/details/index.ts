import { FastifyReply, FastifyRequest } from 'fastify'
import { filterPetParamsSchema } from './schema'
import { makeGetPetDetails } from '@/http/use-cases/factories/make-get-pet-details-use-case-factory'
import { ResourceNotFoundError } from '@/http/use-cases/errors/resource-not-found-error'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const { id } = filterPetParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetails()

  try {
    const { pet } = await getPetDetailsUseCase.execute(id)
    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}

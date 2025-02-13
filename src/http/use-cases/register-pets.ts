import { OngsRepository } from '@/repositories/ongs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class RegisterPetsUseCase {
  constructor(private petsRepository: PetsRepository, private ongsRepository: OngsRepository) {
    this.petsRepository = petsRepository
    this.ongsRepository = ongsRepository
  }

  async execute({
    name,
    about,
    age,
    breed,
    dependency_level,
    energy_level,
    environment,
    ong_id,
    size,
    adopted_at,
    adoption_requirements,
    created_at,
  }: Prisma.PetUncheckedCreateInput) {
    const ong = await this.ongsRepository.findById(ong_id)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      breed,
      dependency_level,
      energy_level,
      environment,
      ong_id,
      size,
      adopted_at,
      adoption_requirements,
      created_at,
    })

    return { pet }
  }
}
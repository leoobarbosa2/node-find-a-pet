import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(id: string) {
    const pet = await this.petsRepository.findById(id)

    if(!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
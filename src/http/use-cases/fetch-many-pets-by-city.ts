import { PetsRepository } from '@/repositories/pets-repository'

export class FetchManyPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(city: string) {
    const petsByCity = await this.petsRepository.findManyByCity(city)

    return {
      petsByCity,
    }
  }
}
import { PetsRepository } from '@/repositories/pets-repository'

interface FilterManyPetsUseCaseParams {
  name?: string
  age?: 'PUPPY'| 'YOUNG'| 'ADULT'| 'SENIOR'
  breed?: string
  energy_level?: 'ONE'| 'TWO'| 'THREE'| 'FOUR' | 'FIVE'
  size?: 'SMALL'| 'MEDIUM'| 'BIG'
  dependency_level?: 'LOW'| 'MEDIUM'| 'HIGH'
  environment?: 'INDOOR' | 'OUTDOOR' | 'BOTH'
}

export class FilterManyPetsUseCase {
  constructor(private petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute({ age, breed, dependency_level, energy_level, name,size, environment }: FilterManyPetsUseCaseParams) {
    const pets = await this.petsRepository.filter({ age, breed, dependency_level, energy_level, environment, name, size })

    return { pets }
  }
}
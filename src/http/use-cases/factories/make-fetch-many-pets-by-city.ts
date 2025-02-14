import { FetchManyPetsByCityUseCase } from '../fetch-many-pets-by-city'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchManyPets() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchManyPetsByCityUseCase(petsRepository)

  return useCase
}
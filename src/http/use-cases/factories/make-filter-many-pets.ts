import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FilterManyPetsUseCase } from '../filter-many-pets'

export function makeFilterManyPets() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FilterManyPetsUseCase(petsRepository)

  return useCase
}
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetPetDetails() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetDetailsUseCase(petsRepository)

  return useCase
}
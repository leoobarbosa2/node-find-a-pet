import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { RegisterPetsUseCase } from '../register-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterPets() {
  const ongsRepository = new PrismaOngsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterPetsUseCase(petsRepository, ongsRepository)

  return useCase
}
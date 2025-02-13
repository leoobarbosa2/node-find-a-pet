import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { RegisterOngsUseCase } from '../register-ongs'

export function createOngUseCase() {
  const ongsRepository = new PrismaOngsRepository()
  const useCase = new RegisterOngsUseCase(ongsRepository)

  return useCase
}
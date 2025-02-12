import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { CreateOngsUseCase } from '../register-ongs'

export function createOngUseCase() {
  const ongsRepository = new PrismaOngsRepository()
  const useCase = new CreateOngsUseCase(ongsRepository)

  return useCase
}
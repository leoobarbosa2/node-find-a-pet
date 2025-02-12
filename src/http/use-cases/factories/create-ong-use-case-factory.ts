import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { CreateOngsUseCase } from '../create-ongs-use-case'

export function createOngUseCase() {
  const ongsRepository = new PrismaOngsRepository()
  const useCase = new CreateOngsUseCase(ongsRepository)

  return useCase
}
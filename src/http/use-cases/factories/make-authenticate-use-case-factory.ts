import { PrismaOngsRepository } from '@/repositories/prisma/prisma-ongs-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticate() {
  const ongsRepository = new PrismaOngsRepository()
  const useCase = new AuthenticateUseCase(ongsRepository)

  return useCase
}
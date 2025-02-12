import { OngsRepository } from '@/repositories/ongs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import bcryptjs from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseParams {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private ongsRepository: OngsRepository) {
    this.ongsRepository = ongsRepository
  }

  async execute({ email, password }: AuthenticateUseCaseParams) {
    const ong = await this.ongsRepository.findUniqueByEmail(email)

    if(!ong) {
      throw new ResourceNotFoundError()
    }

    const isPasswordCorrect = await bcryptjs.compare(password, ong.password_hash)

    if(!isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return {
      ong,
    }
  }
}
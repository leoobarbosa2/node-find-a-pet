import { OngsRepository } from '@/repositories/ongs-repository'
import bcryptjs from 'bcryptjs'

interface CreateOngsUseCaseParams {
  name: string
  email: string
  password: string
  phone: string
  address: string
  state: string
  city : string
  country: string
  zip_code: string
}

export class CreateOngsUseCase {
  constructor(private ongsRepository: OngsRepository) {
    this.ongsRepository = ongsRepository
  }

  async execute({
    name,
    email,
    password,
    phone,
    address,
    city,
    country,
    state,
    zip_code,
  }: CreateOngsUseCaseParams){
    const hashedPassword = await bcryptjs.hash(password, 6)

    const ong = await this.ongsRepository.create({
      name,
      email,
      password_hash: hashedPassword,
      phone,
      address,
      city,
      country,
      state,
      zip_code,
    })

    return {
      ong,
    }
  }
}
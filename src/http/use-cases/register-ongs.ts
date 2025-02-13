import { OngsRepository } from '@/repositories/ongs-repository'
import bcryptjs from 'bcryptjs'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

interface RegisterOngsUseCaseParams {
  name: string
  email: string
  person_in_charge: string
  password: string
  phone: string
  address: string
  state: string
  city : string
  country: string
  zip_code: string
}

export class RegisterOngsUseCase {
  constructor(private ongsRepository: OngsRepository) {
    this.ongsRepository = ongsRepository
  }

  async execute({
    name,
    email,
    person_in_charge,
    password,
    phone,
    address,
    city,
    country,
    state,
    zip_code,
  }: RegisterOngsUseCaseParams){
    const hashedPassword = await bcryptjs.hash(password, 6)

    const emailExists = await this.ongsRepository.findUniqueByEmail(email)

    if(emailExists) {
      throw new OngAlreadyExistsError()
    }

    const ong = await this.ongsRepository.create({
      name,
      email,
      person_in_charge,
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
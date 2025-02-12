import { InMemoryOngsRepository } from '../../repositories/in-memory/in-memory-ongs-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import bcryptjs from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let ongsRepository: InMemoryOngsRepository
let sut: AuthenticateUseCase
let email: string
let password: string

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new AuthenticateUseCase(ongsRepository)
    email = faker.internet.email()
    password = faker.internet.password()

    await ongsRepository.create({
      email,
      password_hash: await bcryptjs.hash(password, 6),
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    })
  })

  it('it should be able to authenticate', async () => {
    const { ong } = await sut.execute({
      email,
      password,
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('it should not be able to create a session with wrong credentials', async () => {
    await expect(() => sut.execute({
      email,
      password: '123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('it should not be able to create a session with an unexisting ong', async() => {
    await expect(async () => sut.execute({
      email: faker.internet.email(),
      password: await bcryptjs.hash(password, 6),
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
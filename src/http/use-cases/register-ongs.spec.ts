import { InMemoryOngsRepository } from '../../repositories/in-memory/in-memory-ongs-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import bcyrptjs from 'bcryptjs'
import { RegisterOngsUseCase } from './register-ongs'
import { faker } from '@faker-js/faker'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

let ongsRepository: InMemoryOngsRepository
let sut: RegisterOngsUseCase

describe('Create Ongs Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    sut = new RegisterOngsUseCase(ongsRepository)
  })

  it('it should be able to register an ong', async () => {
    const { ong } = await sut.execute({
      name: faker.company.name(),
      person_in_charge: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('it should hash ong password as intended', async () => {
    const password = faker.internet.password()

    const { ong } = await sut.execute({
      name: faker.company.name(),
      email: faker.internet.email(),
      person_in_charge: faker.person.fullName(),
      password,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    })

    const isPasswordCorrectlyHashed = await bcyrptjs.compare(password, ong.password_hash)

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('it should not be able to create a ong using an existing e-mail', async() => {
    const email = faker.internet.email()

    await sut.execute({
      name: faker.company.name(),
      email,
      person_in_charge: faker.person.fullName(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    })

    await expect(( ) => sut.execute({
      name: faker.company.name(),
      email,
      person_in_charge: faker.person.fullName(),
      password: faker.internet.password(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    })).rejects.toBeInstanceOf(OngAlreadyExistsError)
  })
})
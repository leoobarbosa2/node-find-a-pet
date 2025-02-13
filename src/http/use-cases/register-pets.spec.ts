import { describe, it, beforeEach, expect } from 'vitest'
import bcyrptjs from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { RegisterPetsUseCase } from './register-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let ongsRepository: InMemoryOngsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetsUseCase

describe('Create Ongs Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetsUseCase(petsRepository, ongsRepository)
  })

  it('it should be able to register a pet', async () => {
    const { id: ongId } = await ongsRepository.create({
      name: faker.company.name(),
      person_in_charge: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: await bcyrptjs.hash(faker.internet.password(), 6),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    })

    const { pet } = await sut.execute(
      {
        name: faker.animal.petName(),
        about: faker.word.adjective(),
        age: 'PUPPY',
        breed: faker.animal.type(),
        dependency_level: 'LOW',
        energy_level: 'FOUR',
        environment: 'INDOOR',
        size: 'MEDIUM',
        adoption_requirements: [''],
        adopted_at: null,
        ong_id: ongId,
      },
    )

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.ong_id).toEqual(ongId)
  })

  it('it should not be able to register a pet with an unexisting ong', async() => {
    await expect(() => sut.execute(
      {
        name: faker.animal.petName(),
        about: faker.word.adjective(),
        age: 'PUPPY',
        breed: faker.animal.type(),
        dependency_level: 'LOW',
        energy_level: 'FOUR',
        environment: 'INDOOR',
        size: 'MEDIUM',
        adoption_requirements: [''],
        adopted_at: null,
        ong_id: 'invalid-ong-id',
      },
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
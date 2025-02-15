import { describe, it, beforeEach, expect } from 'vitest'
import bcyrptjs from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { FetchManyPetsByCityUseCase } from './fetch-many-pets-by-city'

let ongsRepository: InMemoryOngsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchManyPetsByCityUseCase

describe('Feth Many Pets Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    petsRepository = new InMemoryPetsRepository(ongsRepository)
    sut = new FetchManyPetsByCityUseCase(petsRepository)
  })

  it('it should be able to fetch for pets by city', async () => {
    const city = faker.location.city()

    const ong = await ongsRepository.create({
      name: faker.company.name(),
      person_in_charge: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: await bcyrptjs.hash(faker.internet.password(), 6),
      address: faker.location.streetAddress(),
      city,
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    })

    await petsRepository.create({
      name: faker.animal.petName(),
      about: faker.word.adjective(),
      age: 'ADULT',
      breed: faker.animal.type(),
      dependency_level: 'LOW',
      energy_level: 'FOUR',
      environment: 'INDOOR',
      size: 'SMALL',
      adoption_requirements: [''],
      adopted_at: null,
      ong_id: ong.id,
    })

    await petsRepository.create({
      name: faker.animal.petName(),
      about: faker.word.adjective(),
      age: 'SENIOR',
      breed: faker.animal.type(),
      dependency_level: 'LOW',
      energy_level: 'FOUR',
      environment: 'INDOOR',
      size: 'BIG',
      adoption_requirements: [''],
      adopted_at: null,
      ong_id: ong.id,
    })

    const { petsByCity } = await sut.execute(city)

    expect(petsByCity.length).toBe(2)
    expect(petsByCity[0].ong_id).toEqual(ong.id)
  })

  it('should return an empty list of pets if no pets were found', async () => {
    const city = faker.location.city()

    const { petsByCity } = await sut.execute(city)

    expect(petsByCity).toHaveLength(0)
    expect(petsByCity).toEqual([])
  })
})
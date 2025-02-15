import { describe, it, beforeEach, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FilterManyPetsUseCase } from './filter-many-pets'
import { randomUUID } from 'node:crypto'

let petsRepository: InMemoryPetsRepository
let sut: FilterManyPetsUseCase

describe('Filter Many Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterManyPetsUseCase(petsRepository)
  })

  it('it should be able to filter pets', async () => {
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
      ong_id: 'fake-id',
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
      ong_id: 'fake-id',
    })

    const { pets } = await sut.execute({ age: 'ADULT' })

    expect(pets.length).toBe(1)
    expect(pets[0].age).toEqual('ADULT')
  })

  it('should be able to multi filter for pets', async () => {
    const expectedCompanyId = randomUUID()

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
      ong_id: 'fake-id',
    })

    await petsRepository.create({
      name: faker.animal.petName(),
      about: faker.word.adjective(),
      age: 'SENIOR',
      breed: faker.animal.type(),
      dependency_level: 'LOW',
      energy_level: 'FOUR',
      environment: 'OUTDOOR',
      size: 'BIG',
      adoption_requirements: [''],
      adopted_at: null,
      ong_id: 'fake-id',
    })

    await petsRepository.create({
      name: faker.animal.petName(),
      about: faker.word.adjective(),
      age: 'ADULT',
      breed: faker.animal.type(),
      dependency_level: 'LOW',
      energy_level: 'FOUR',
      environment: 'OUTDOOR',
      size: 'BIG',
      adoption_requirements: [''],
      adopted_at: null,
      ong_id: expectedCompanyId,
    })

    const { pets } = await sut.execute({ environment: 'OUTDOOR', age: 'ADULT' })

    expect(pets).toHaveLength(1)
    expect(pets[0].ong_id).toEqual(expectedCompanyId)
  })

  it('should return an empty list of pets if no pets were found', async () => {
    await petsRepository.create({
      name: faker.animal.petName(),
      about: faker.word.adjective(),
      age: 'SENIOR',
      breed: faker.animal.type(),
      dependency_level: 'LOW',
      energy_level: 'FOUR',
      environment: 'OUTDOOR',
      size: 'BIG',
      adoption_requirements: [''],
      adopted_at: null,
      ong_id: 'fake-id',
    })

    const { pets } = await sut.execute({ breed: 'not-found-breed' })

    expect(pets).toHaveLength(0)
    expect(pets).toEqual([])
  })
})
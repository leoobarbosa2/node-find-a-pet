import { describe, it, beforeEach, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
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

    const { id: expectedId } = await petsRepository.create({
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

    const { pet } = await sut.execute(expectedId)

    expect(pet?.id).toBe(expectedId)
  })

  it('should return error in case of pet details was not found', async () => {
    const fakeUuid = randomUUID()

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

    await expect(() => sut.execute(fakeUuid)).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
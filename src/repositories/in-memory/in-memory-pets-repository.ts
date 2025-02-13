import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      adoption_requirements: data.adoption_requirements as string[],
      age: data.age,
      breed: data.breed,
      created_at: new Date(),
      energy_level: data.energy_level,
      ong_id: data.ong_id,
      dependency_level: data.dependency_level,
      environment: data.environment,
      adopted_at: null,
      size: data.size,
    }

    this.pets.push(pet)

    return pet
  }
}
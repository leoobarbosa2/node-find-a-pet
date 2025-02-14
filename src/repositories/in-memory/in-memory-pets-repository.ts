import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { InMemoryOngsRepository } from './in-memory-ongs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  constructor(private ongsRepository?: InMemoryOngsRepository) {
    this.ongsRepository = ongsRepository
  }

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

  async findManyByCity(city: string) {
    if(!this.ongsRepository) {
      throw Error('Provide Ongs Repository to use this function')
    }

    const ongsByCity = await this.ongsRepository.findByCity(city)

    const pets = this.pets.filter(pet => ongsByCity?.some(ong => ong.id === pet.ong_id))

    return pets
  }
}
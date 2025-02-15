import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

interface FilterPetsParams {
  name?: string
  age?: 'PUPPY'| 'YOUNG'| 'ADULT'| 'SENIOR'
  breed?: string
  energy_level?: 'ONE'| 'TWO'| 'THREE'| 'FOUR' | 'FIVE'
  size?: 'SMALL'| 'MEDIUM'| 'BIG'
  dependency_level?: 'LOW'| 'MEDIUM'| 'HIGH'
  environment?: 'INDOOR' | 'OUTDOOR' | 'BOTH'
}

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput){
    const pet = await prisma.pet.create({
      data: {
        id: randomUUID(),
        name: data.name,
        about: data.about,
        age: data.age,
        breed: data.breed,
        dependency_level: data.dependency_level,
        energy_level: data.energy_level,
        environment: data.environment,
        size: data.size,
        adopted_at: null,
        adoption_requirements: data.adoption_requirements,
        created_at: new Date(),
        ong_id: data.ong_id,
      },
    })

    return pet
  }

  async findManyByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        ong: {
          city,
        },
      },
    })

    return pets
  }

  async filter({ name, age, breed, dependency_level, energy_level, environment, size }: FilterPetsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        name: { contains: name },
        age,
        breed,
        dependency_level,
        energy_level,
        environment,
        size,
      },

    })

    return pets
  }
}

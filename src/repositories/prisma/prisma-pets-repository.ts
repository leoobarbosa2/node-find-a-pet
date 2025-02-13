import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

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
}

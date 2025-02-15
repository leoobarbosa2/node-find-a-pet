import { Pet, Prisma } from '@prisma/client'

interface FilterPetsParams {
  name?: string
  age?: 'PUPPY'| 'YOUNG'| 'ADULT'| 'SENIOR'
  breed?: string
  energy_level?: 'ONE'| 'TWO'| 'THREE'| 'FOUR' | 'FIVE'
  size?: 'SMALL'| 'MEDIUM'| 'BIG'
  dependency_level?: 'LOW'| 'MEDIUM'| 'HIGH'
  environment?: 'INDOOR' | 'OUTDOOR' | 'BOTH'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findManyByCity(city: string): Promise<Pet[] | []>

  filter(data?: FilterPetsParams): Promise<Pet[] | []>
}
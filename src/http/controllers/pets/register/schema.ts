import { z } from 'zod'

export const registerPetBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']),
  breed: z.string(),
  dependency_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  energy_level: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
  environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']),
  size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
  adoption_requirements: z.array(z.string()),
})

export const registerPetQuerySchema = z.object({
  ongId: z.string(),
})
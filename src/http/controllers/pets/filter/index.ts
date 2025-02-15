import { z } from 'zod'

export const filterPetsBodySchema = z.object({
  name: z.string().optional(),
  age: z.enum(['PUPPY', 'YOUNG', 'ADULT', 'SENIOR']).optional(),
  breed: z.string().optional(),
  energy_level: z.enum(['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']).optional(),
  dependency_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  environment: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']).optional(),
  size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
}).optional()


import { z } from 'zod'

export const searchPetsQuerySchema = z.object({
  city: z.string(),
})
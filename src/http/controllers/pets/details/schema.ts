import { z } from 'zod'

export const filterPetParamsSchema = z.object({
  id: z.string(),
})
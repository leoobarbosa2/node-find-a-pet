import { z } from 'zod'

export const createAuthenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
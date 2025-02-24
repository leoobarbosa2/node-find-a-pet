import { z } from 'zod'

export const registerOngBodySchema = z.object({
  name: z.string().min(3),
  person_in_charge: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
  address: z.string(),
  state: z.string(),
  city : z.string(),
  country: z.string(),
  zip_code: z.string(),
})
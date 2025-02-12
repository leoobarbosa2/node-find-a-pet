import 'dotenv/config'

import { z } from 'zod'

const createEnvSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3333),
})

const _env = createEnvSchema.safeParse(process.env)

if(_env.error) {
  console.error('Invalid environment variables', _env.error.format())
}

const env = _env.data

export { env }

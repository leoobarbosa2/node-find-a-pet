import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndReturnFirstPet } from 'test/utils'

describe('Pets Details Controller [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { firstPet } = await createAndReturnFirstPet()

    const response = await request(app.server)
      .get(`/pets/${firstPet?.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: firstPet!.id,
      }),
    })
  })
},
)

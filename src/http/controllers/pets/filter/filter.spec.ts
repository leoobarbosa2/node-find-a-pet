import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createPetByManyCities } from 'test/utils'

describe('Filter Pets Controller [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search by pets using filters', async () => {
    const cities = ['São Paulo', 'Campinas']
    await createPetByManyCities(cities)

    const response = await request(app.server)
      .get('/pets')
      .query({ age: 'PUPPY' })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body).toEqual({
      pets: [
        expect.objectContaining({ id: expect.any(String) }),
        expect.objectContaining({ id: expect.any(String) }),
      ],
    })
  })
},
)

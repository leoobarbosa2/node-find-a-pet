import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createPetByManyCities } from 'test/utils'

describe('Search Pets By City Controller [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search for pets inside a city', async () => {
    const cities = ['São Paulo', 'Campinas', 'São Paulo'] // creating 2 pets for São paulo
    await createPetByManyCities(cities)

    const saoPauloResponse = await request(app.server)
      .get('/pets/cities/São Paulo')

    expect(saoPauloResponse.statusCode).toEqual(200)
    expect(saoPauloResponse.body.petsByCity).toHaveLength(2)

    const campinasReponse = await request(app.server)
      .get('/pets/cities/Campinas')

    expect(campinasReponse.statusCode).toEqual(200)
    expect(campinasReponse.body.petsByCity).toHaveLength(1)
  })
},
)

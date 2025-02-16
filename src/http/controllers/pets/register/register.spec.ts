import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { faker } from '@faker-js/faker'
import { createAndAuthenticateOng } from 'test/utils'

describe('Pets Register Controller [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOng()

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: faker.animal.petName(),
        about: faker.word.adjective(),
        age: 'PUPPY',
        breed: faker.animal.type(),
        dependency_level: 'LOW',
        energy_level: 'FOUR',
        environment: 'INDOOR',
        size: 'MEDIUM',
        adoption_requirements: [''],
        adopted_at: null,
      })

    expect(response.statusCode).toEqual(201)
  })
},
)

import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { faker } from '@faker-js/faker'

describe('Ong Register Controller [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an ong', async () => {
    const response = await request(app.server)
      .post('/ongs')
      .send({
        name: faker.company.name(),
        email: faker.internet.email(),
        person_in_charge: faker.person.fullName(),
        password: faker.internet.password({ length: 6 }),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.city(),
        phone: faker.phone.number(),
        state: faker.location.state(),
        zip_code: faker.location.zipCode(),
      })

    expect(response.statusCode).toEqual(201)
  })
},
)

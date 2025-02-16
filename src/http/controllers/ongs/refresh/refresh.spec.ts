import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { faker } from '@faker-js/faker'

describe('Refresh Token Controller [E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able create a new token using refresh_token via cookies', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password({ length: 6 })

    await request(app.server)
      .post('/ongs')
      .send({
        name: faker.company.name(),
        email,
        person_in_charge: faker.person.fullName(),
        password,
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.city(),
        phone: faker.phone.number(),
        state: faker.location.state(),
        zip_code: faker.location.zipCode(),
      })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email,
        password,
      })

    const cookies = authResponse.get('Set-Cookie')

    const refreshResponse = await request(app.server)
      .post('/refresh-token')
      .set('Cookie', cookies as string[])
      .send()

    expect(refreshResponse.statusCode).toEqual(200)
    expect(refreshResponse.body).toEqual({
      token: expect.any(String),
    })
    expect(refreshResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refresh_token='),
    ])
  })
},
)

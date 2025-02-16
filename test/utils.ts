import { prisma } from '@/lib/prisma'
import request from 'supertest'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'
import { app } from '@/app'

export async function createAndAuthenticateOng() {
  const email = faker.internet.email()
  const password = faker.internet.password({ length: 6 })

  await prisma.ong.create({
    data: {
      name: faker.company.name(),
      email,
      person_in_charge: faker.person.fullName(),
      password_hash: await bcrypt.hash(password, 6) ,
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.city(),
      phone: faker.phone.number(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
    },
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email,
      password,
    })

  const { token } = authResponse.body

  return {
    token,
  }
}

export async function createAndReturnFirstPet() {
  const { token } = await createAndAuthenticateOng()

  await request(app.server)
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

  const firstPet = await prisma.pet.findFirst()

  return {
    firstPet,
  }
}

export async function createPetByManyCities(cities: string[]) {
  const password = faker.internet.password({ length: 6 })

  for await (const city of cities) {
    const { id } = await prisma.ong.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        person_in_charge: faker.person.fullName(),
        password_hash: await bcrypt.hash(password, 6) ,
        address: faker.location.streetAddress(),
        city: city,
        country: faker.location.city(),
        phone: faker.phone.number(),
        state: faker.location.state(),
        zip_code: faker.location.zipCode(),
      },
    })

    await prisma.pet.create({
      data: {
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
        ong_id: id,
      },
    })
  }
}


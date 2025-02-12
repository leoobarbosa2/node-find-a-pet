import { Prisma, Ong } from '@prisma/client'
import { OngsRepository } from '../ongs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOngsRepository implements OngsRepository {
  public ongs: Ong[] = []

  async create({ name, email, password_hash, address, city, country, phone, state, zip_code }: Prisma.OngCreateInput) {
    const ong = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      address,
      city,
      country,
      phone,
      state,
      zip_code,
      created_at: new Date(),
    }

    this.ongs.push(ong)

    return ong
  }

  async findUniqueByEmail(email: string) {
    const ong = this.ongs.find(ong => ong.email === email)

    if(!ong) {
      return null
    }

    return ong
  }
}
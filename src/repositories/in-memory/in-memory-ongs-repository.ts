import { Prisma, Ong } from '@prisma/client'
import { OngsRepository } from '../ongs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOngsRepository implements OngsRepository {
  public ongs: Ong[] = []

  async create({ name, email, password_hash, address, city, country, phone, state, zip_code, person_in_charge }: Prisma.OngCreateInput) {
    const ong = {
      id: randomUUID(),
      name,
      person_in_charge,
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

  async findById(id: string) {
    const ong = this.ongs.find(ong => ong.id === id)

    if(!ong) {
      return null
    }

    return ong
  }

  async findByCity(city: string) {
    const ongs = this.ongs.filter(ong => ong.city === city)

    if(!ongs) {
      return null
    }

    return ongs
  }
}
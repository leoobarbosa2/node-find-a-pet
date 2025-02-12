import { Prisma } from '@prisma/client'
import { OngsRepository } from '../ongs-repository'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'node:crypto'

export class PrismaOngsRepository implements OngsRepository {
  async create(data: Prisma.OngCreateInput){
    const ong = await prisma.ong.create({
      data: {
        id: randomUUID(),
        name: data.name,
        phone: data.phone,
        state: data.state,
        zip_code: data.zip_code,
        created_at: new Date(),
        address: data.address,
        city: data.city,
        country: data.country,
        email: data.email,
        password_hash: data.password_hash,
      },
    })

    return ong
  }

  async findUniqueByEmail(email: string) {
    const ongByEmail = await prisma.ong.findUnique({
      where: {
        email,
      },
    })

    return ongByEmail
  }
}
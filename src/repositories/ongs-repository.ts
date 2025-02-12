import { Ong, Prisma } from '@prisma/client'

export interface OngsRepository {
  create(data: Prisma.OngCreateInput): Promise<Ong>

  findUniqueByEmail(email: string): Promise<Ong | null>
}
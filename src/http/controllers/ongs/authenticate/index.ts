import { FastifyReply, FastifyRequest } from 'fastify'
import { createAuthenticateBodySchema } from './schema'
import { makeAuthenticate } from '@/http/use-cases/factories/make-authenticate-use-case-factory'
import { InvalidCredentialsError } from '@/http/use-cases/errors/invalid-credentials-error'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = createAuthenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticate()

    const { ong } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { },
      {
        sign: {
          sub: ong.id ,
          expiresIn: '7d',
        },
      })

    return reply
      .status(200)
      .setCookie('refresh_token', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
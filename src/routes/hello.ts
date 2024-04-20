import { type FastifyInstance } from 'fastify'

export async function helloRoute (app: FastifyInstance): Promise<void> {
  app.get(
    '/',
    async (request, reply) => {
      return await reply.status(200).send('Hello :)')
    }
  )
}

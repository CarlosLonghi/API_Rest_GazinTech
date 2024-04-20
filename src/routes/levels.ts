import { type FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { knex } from '../database'
import { z } from 'zod'

export async function levelsRoutes (app: FastifyInstance): Promise<void> {
  app.get('/', async (request, reply) => {
    const levels = await knex('levels').select()

    return await reply.status(200).send({ levels })
  })

  app.post('/', async (request, reply) => {
    try {
      const createLevelBodySchema = z.object({
        level: z.string().min(1).max(255)
      })

      const { level } = createLevelBodySchema.parse(request.body)

      await knex('levels').insert({
        id: randomUUID(),
        level
      })

      return await reply.status(201).send()
    } catch (error) {
      return await reply.status(400).send({ error: 'Incorrect request body.' })
    }
  })

  app.put('/:id', async (request, reply) => {
    try {
      const getLevelByIdParamsSchema = z.object({
        id: z.string().uuid()
      })

      const getLevelBodyToUpdate = z.object({
        level: z.string().min(1).max(255)
      })

      const { id } = getLevelByIdParamsSchema.parse(request.params)
      const { level } = getLevelBodyToUpdate.parse(request.body)

      await knex('levels').where({ id }).update({
        level
      })

      return await reply.status(200).send()
    } catch (error) {
      return await reply.status(400).send({ error: 'Incorrect request body.' })
    }
  })

  app.delete('/:id', async (request, reply) => {
    const getLevelByIdParamsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = getLevelByIdParamsSchema.parse(request.params)

    await knex('levels').where({ id }).delete()

    return await reply.status(204).send()
  })
}

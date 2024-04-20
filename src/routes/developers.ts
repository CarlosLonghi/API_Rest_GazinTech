import { type FastifyInstance } from 'fastify'
import { randomUUID } from 'crypto'
import { knex } from '../database'
import { z } from 'zod'

import { calculateTimeDifference } from '../utils/calculateTimeDifference'

export async function developersRoutes (app: FastifyInstance): Promise<void> {
  app.get('/', async (request, reply) => {
    const developers = await knex('developers').select()

    return await reply.status(200).send({ developers })
  })

  app.post('/', async (request, reply) => {
    try {
      const createDeveloperBodySchema = z.object({
        levelId: z.string(),
        name: z.string().min(1).max(255),
        sex: z.string().length(1),
        birthDate: z.string().datetime(),
        hobby: z.string().min(1).max(255)
      })

      const { levelId, name, sex, birthDate, hobby } = createDeveloperBodySchema.parse(request.body)

      const age = calculateTimeDifference(new Date(birthDate))

      await knex('developers').insert({
        id: randomUUID(),
        level_id: levelId,
        sex,
        name,
        birth_date: birthDate,
        age,
        hobby
      })

      return await reply.status(201).send()
    } catch (error) {
      return await reply.status(400).send(error)
    }
  })

  app.put('/:id', async (request, reply) => {
    try {
      const getDeveloperByIdParamsSchema = z.object({
        id: z.string().uuid()
      })

      const getDeveloperBodyToUpdate = z.object({
        levelId: z.string(),
        name: z.string().min(1).max(255),
        sex: z.string().length(1),
        birthDate: z.string().datetime(),
        hobby: z.string().min(1).max(255)
      })

      const { id } = getDeveloperByIdParamsSchema.parse(request.params)
      const { levelId, name, sex, birthDate, hobby } = getDeveloperBodyToUpdate.parse(request.body)

      const age = calculateTimeDifference(new Date(birthDate))

      await knex('developers').where({ id }).update({
        level_id: levelId,
        sex,
        name,
        birth_date: birthDate,
        age,
        hobby
      })

      return await reply.status(200).send()
    } catch (error) {
      return await reply.status(400).send(error)
    }
  })

  app.delete('/:id', async (request, reply) => {
    try {
      const getDeveloperByIdParamsSchema = z.object({
        id: z.string().uuid()
      })
      const { id } = getDeveloperByIdParamsSchema.parse(request.params)

      await knex('developers').where({ id }).delete()

      return await reply.status(204).send()
    } catch (error) {
      return await reply.status(400).send(error)
    }
  })
}

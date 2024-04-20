import fastify from 'fastify'
import { levelsRoutes } from './routes/levels'

export const app = fastify()

void app.register(levelsRoutes, {
  prefix: '/niveis'
})

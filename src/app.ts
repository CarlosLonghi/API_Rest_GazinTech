import fastify from 'fastify'
import { levelsRoutes } from './routes/levels'
import { developersRoutes } from './routes/developers'

export const app = fastify()

void app.register(levelsRoutes, {
  prefix: '/niveis'
})

void app.register(developersRoutes, {
  prefix: '/desenvolvedores'
})

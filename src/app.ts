import fastify from 'fastify'
import { helloRoute } from './routes/hello'

export const app = fastify()

void app.register(helloRoute, {
  prefix: '/hello'
})

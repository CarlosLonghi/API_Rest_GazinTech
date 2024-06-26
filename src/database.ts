import { knex as setupKnex, type Knex } from 'knex'
import { env } from './env'

const databaseUrlFormat =
  env.DATABASE_CLIENT === 'sqlite'
    ? {
        filename: env.DATABASE_URL
      }
    : env.DATABASE_URL

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: databaseUrlFormat,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations'
  }

}

export const knex = setupKnex(config)

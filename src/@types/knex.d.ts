// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    levels: {
      id: string
      level: string
    }

    developers: {
      id: string
      level_id: string
      name: string
      sex: char
      birth_date: date
      age: integer
      hobby: string
    }
  }
}

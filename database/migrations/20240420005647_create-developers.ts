import type { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('developers', (table) => {
    table.uuid('id').notNullable().primary()
    table.uuid('level_id').notNullable().references('id').inTable('levels')
    table.string('name').notNullable()
    table.string('sex', 1).notNullable()
    table.date('birth_date').notNullable()
    table.integer('age').notNullable()
    table.string('hobby').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('developers')
}

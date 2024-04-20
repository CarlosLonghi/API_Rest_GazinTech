import { execSync } from 'node:child_process'
import { app } from '../src/app'
import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'

describe('Levels routes CRUD', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  describe('Create Level', () => {
    it('should be able to create a new level', async () => {
      await request(app.server)
        .post('/niveis')
        .send({
          level: 'Nível Exemplo'
        })
        .expect(201)
    })

    it('should not be able to create level with incorrect request body', async () => {
      await request(app.server)
        .post('/niveis')
        .send({
          level: ''
        })
        .expect(400)
    })
  })

  describe('Update Level', () => {
    it('should be able to update level', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'

      await request(app.server)
        .post('/niveis')
        .send({
          id: levelUUID,
          level: 'Nível Exemplo'
        })
        .expect(201)

      await request(app.server)
        .put(`/niveis/${levelUUID}`)
        .send({
          level: 'Nível Atualizado'
        })
        .expect(200)
    })

    it('should not be able to update level with incorrect request body', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'

      await request(app.server)
        .post('/niveis')
        .send({
          id: levelUUID,
          level: 'Nível Exemplo'
        })
        .expect(201)

      await request(app.server)
        .put(`/niveis/${levelUUID}`)
        .send({
          level: ''
        })
        .expect(400)
    })
  })

  describe('List Levels', () => {
    it('should not be able to list levels with incorrect request body', async () => {
      await request(app.server)
        .post('/niveis')
        .send({
          level: 'Nível Exemplo 1'
        })
        .expect(201)

      await request(app.server)
        .post('/niveis')
        .send({
          level: 'Nível Exemplo 2'
        })
        .expect(201)

      const listLevelsResponse = await request(app.server)
        .get('/niveis')
        .expect(200)

      expect(listLevelsResponse.body.levels).lengthOf(2)
    })

    it('should not be able to list levels if no levels are found', async () => {
      await request(app.server)
        .get('/niveis')
        .expect(404)
    })
  })

  describe('Delete Level', () => {
    it('should be able to delete level', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'

      await request(app.server)
        .post('/niveis')
        .send({
          id: levelUUID,
          level: 'Nível Exemplo'
        })
        .expect(201)

      await request(app.server)
        .delete(`/niveis/${levelUUID}`)
        .expect(204)
    })

    it('should not be able to delete level if developers are associated with it', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'
      const developerUUID = '"e8d708b8-df8c-414c-ae37-818bbdc4cd74"'

      await request(app.server)
        .post('/niveis')
        .send({
          id: levelUUID,
          level: 'Nível Exemplo'
        })
        .expect(201)

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test',
          created_at: new Date(),
          updated_at: new Date()
        })
        .expect(201)

      await request(app.server)
        .delete(`/niveis/${levelUUID}`)
        .expect(400)
    })
  })
})

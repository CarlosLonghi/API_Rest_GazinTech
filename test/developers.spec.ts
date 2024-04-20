import { execSync } from 'node:child_process'
import { app } from '../src/app'
import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { randomUUID } from 'node:crypto'

describe('Developers routes CRUD', () => {
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

  describe('Create Developer', () => {
    it('should be able to create a new developer', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'
      const developerUUID = 'e8d708b8-df8c-414c-ae37-818bbdc4cd74'

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(201)
    })

    it('should not be able to create developer with incorrect request body', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'
      const developerUUID = 'e8d708b8-df8c-414c-ae37-818bbdc4cd74'

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: '',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(400)
    })
  })

  describe('Update Developer', () => {
    it('should be able to update developer', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'
      const developerUUID = 'e8d708b8-df8c-414c-ae37-818bbdc4cd74'

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(201)

      await request(app.server)
        .put(`/desenvolvedores/${developerUUID}`)
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: 'Nome Atualizado',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(200)
    })

    it('should not be able to update developer with incorrect request body', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'
      const developerUUID = 'e8d708b8-df8c-414c-ae37-818bbdc4cd74'

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(201)

      await request(app.server)
        .put(`/desenvolvedores/${developerUUID}`)
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: '',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(400)
    })
  })

  describe('List Developer', () => {
    it('should be able to list developers', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: randomUUID(),
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor 1',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(201)

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: randomUUID(),
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor 2',
          sex: 'F',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(201)

      const listDevelopersResponse = await request(app.server)
        .get('/desenvolvedores')
        .expect(200)

      expect(listDevelopersResponse.body.developers).lengthOf(2)
    })

    it('should not be able to list developers if no developers are found', async () => {
      await request(app.server)
        .get('/desenvolvedores')
        .expect(404)
    })
  })

  describe('Delete Developer', () => {
    it('should be able to delete developer', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'
      const developerUUID = 'e8d708b8-df8c-414c-ae37-818bbdc4cd74'

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(201)

      await request(app.server)
        .delete(`/desenvolvedores/${developerUUID}`)
        .expect(204)
    })

    it('should not be able to delete developer when missing developer id', async () => {
      const levelUUID = '15b691f3-c573-463c-befa-7c987079ad3c'
      const developerUUID = 'e8d708b8-df8c-414c-ae37-818bbdc4cd74'

      await request(app.server)
        .post('/desenvolvedores')
        .send({
          id: developerUUID,
          levelId: levelUUID,
          name: 'Nome do Desenvolvedor',
          sex: 'M',
          birthDate: '2000-01-01T03:00:00.000Z',
          age: 20,
          hobby: 'test'
        })
        .expect(201)

      await request(app.server)
        .delete('/desenvolvedores/')
        .expect(400)
    })
  })
})

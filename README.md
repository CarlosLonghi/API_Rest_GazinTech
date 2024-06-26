## Variáveis de ambiente

- Altere o nome de arquivo `.env.example` para `.env`, e `.env.test.example` para `.env.test`.

## Rodando o Projeto

- Instalação da API RESTful

```bash
    npm install
```

- Comando para execultar as migrações e criar o Banco de Dados.

```bash
    npm run knex -- migrate:latest
```

- Comando para execultar a API

```bash
    npm run dev
```

## Execultando Testes

- Comando para execultar os testes.

```bash
    npm run test
```

# RF (Requisitos Funcionais)

#### Níveis

- [x] Deve ser possível cadastrar um nível;
- [x] Deve ser possível listar os níveis;
- [x] Deve ser possível editar o nível;
- [x] Deve ser possível deletar o nível;

#### Desenvolvedores

- [x] Deve ser possível cadastrar um desenvolvedor;
- [x] Deve ser possível listar os desenvolvedores;
- [x] Deve ser possível editar um desenvolvedor;
- [x] Deve ser possível deletar um desenvolvedor;

# RN (Regra de Negócio)

- [x] Não deve ser possível deletar um nível se houverem desenvolvedores vinculados à ele;

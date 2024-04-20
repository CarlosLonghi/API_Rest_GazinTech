## Start

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

# RF (Requisitos Funcionais)

#### Níveis

- [ ] Deve ser possível cadastrar um nível;
- [ ] Deve ser possível listar os níveis;
- [ ] Deve ser possível editar o nível;
- [ ] Deve ser possível deletar o nível;

#### Desenvolvedores

- [ ] Deve ser possível cadastrar um desenvolvedor;
- [ ] Deve ser possível listar os desenvolvedores;
- [ ] Deve ser possível editar um desenvolvedor;
- [ ] Deve ser possível deletar um desenvolvedor;

# RN (Regra de Negócio)

- [ ] Não deve ser possível deletar um nível se houverem desenvolvedores vinculados à ele;

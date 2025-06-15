![Fastify Boilerplate](https://raw.githubusercontent.com/fastify/graphics/96648545bcad9d1984dd96363a39e2775b59afef/fastify-landscape-outlined.svg)

# 🚀 Fastify API Boilerplate: Seguro e Escalável.

Um boilerplate robusto e escalável para APIs REST com Fastify, TypeScript e Prisma. Pronto para produção, com autenticação, integração com banco de dados, validação de ambiente e arquitetura modular.

## ✨ Features

- **Autenticação Completa**:
  - JWT (Access/Refresh Token via cookies HttpOnly)
  - Login local (e-mail/senha)
  - OAuth2 (Google)
  - Rotação e revogação de refresh token
  - Detecção de roubo de token
- **Stack Moderna**: TypeScript, Fastify, Prisma, Zod
- **Banco de Dados**: Prisma ORM + PostgreSQL
- **Docker**: Ambiente pronto para desenvolvimento e produção
- **Arquitetura Modular**: Separação clara por módulos, plugins e camadas (Controller, Service, Repository)
- **Validação e Segurança**: Zod, bcrypt, Helmet, CORS
- **Swagger**: Documentação automática

## 🛠️ Tech Stack

- **Framework**: [Fastify](https://www.fastify.io/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Validação**: [Zod](https://zod.dev/)
- **Autenticação**: [@fastify/jwt](https://github.com/fastify/fastify-jwt), [@fastify/cookie](https://github.com/fastify/fastify-cookie), [@fastify/oauth2](https://github.com/fastify/fastify-oauth2)
- **Segurança**: [bcrypt](https://github.com/dcodeIO/bcrypt.js), [@fastify/helmet](https://github.com/fastify/fastify-helmet), [@fastify/cors](https://github.com/fastify/fastify-cors)
- **Documentação**: [@fastify/swagger](https://github.com/fastify/fastify-swagger)
- **Lint/Format**: ESLint, Prettier, Husky
- **Testes**: Jest
- **Container**: Docker, Docker Compose

## 📁 Estrutura de Pastas

```
.
├── prisma/                  # Schema e migrações do Prisma
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── core/
│   │   ├── config/          # Configuração de ambiente (env.ts)
│   │   ├── database/        # Conexão com o banco (connection.ts)
│   │   ├── plugins/
│   │   │   └── auth/        # Plugin de autenticação (hooks, index, utils)
│   │   └── webserver/       # App, error handler, etc
│   ├── modules/
│   │   ├── auth/            # Módulo de autenticação
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.schema.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.types.ts
│   │   └── users/           # Módulo de usuários
│   │       ├── user.controller.ts
│   │       ├── user.repository.ts
│   │       ├── user.routes.ts
│   │       ├── user.schema.ts
│   │       ├── user.service.ts
│   │       └── user.types.ts
│   ├── shared/
│   │   └── hash/            # Utilitário de hash de senha
│   │       └── password-hash.ts
│   ├── tests/               # Testes automatizados
│   │   ├── auth/
│   │   └── users/
│   ├── server.ts            # Entry point
│   └── ...
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── ...
```

## 🚀 Como rodar

1. Clone o repositório e instale as dependências:
   ```bash
   git clone ...
   cd ...
   cp .env.example .env
   # Edite o .env conforme necessário
   ```
2. Suba os containers:
   ```bash
   docker-compose up --build -d
   ```
3. Rode as migrações:
   ```bash
   docker-compose exec api npx prisma migrate dev
   ```
4. Acesse: http://localhost:3333

## 🔐 Fluxo de Autenticação

- Login gera cookies HttpOnly (`access_token`, `refresh_token`)
- Refresh automático de token
- Logout revoga todos os tokens
- OAuth2 Google disponível

## ↔️ Endpoints Principais

### Auth (`/api/auth`)

| Método | Rota             | Proteção  | Descrição                                |
| ------ | ---------------- | --------- | ---------------------------------------- |
| POST   | /login           | Pública   | Login com e-mail e senha                 |
| POST   | /refresh         | Pública   | Gera novo access_token via refresh_token |
| POST   | /logout          | Pública   | Logout e revogação de tokens             |
| GET    | /me              | Protegida | Dados do usuário autenticado             |
| GET    | /google          | Pública   | Inicia login Google OAuth2               |
| GET    | /google/callback | Pública   | Callback do Google OAuth2                |

### Usuários (`/api/users`)

| Método | Rota | Proteção  | Descrição                  |
| ------ | ---- | --------- | -------------------------- |
| POST   | /    | Pública   | Cria novo usuário          |
| GET    | /    | Pública   | Lista todos os usuários    |
| GET    | /:id | Pública   | Busca usuário por ID       |
| PUT    | /:id | Protegida | Atualiza usuário (próprio) |
| DELETE | /:id | Protegida | Deleta usuário (próprio)   |

## 🧪 Testes

- Testes unitários e de integração com Jest
- Para rodar:
  ```bash
  npm test
  ```

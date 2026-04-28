<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Sadaf &amp; Co. — API</h1>

<p align="center">
  E-commerce backend for <a href="https://sadafandco.com" target="_blank"><b>Sadaf &amp; Co.</b></a> — a luxury brand selling handcrafted mother-of-pearl <em>(صدف)</em> inlay furniture from artisan workshops in Syria and Lebanon.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white" alt="NestJS 11" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL 16" />
  <img src="https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white" alt="Redis 7" />
  <img src="https://img.shields.io/badge/Zod-validation-3E67B1?logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Docker-compose-2496ED?logo=docker&logoColor=white" alt="Docker" />
</p>

---

## Overview

A modular **NestJS** monolith powering the Sadaf &amp; Co. storefront and admin operations. Designed to split cleanly into microservices (catalog, orders, notifications) once domain boundaries are proven.

The Next.js storefront lives in a separate repository.

---

## Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | NestJS 11                                   |
| Language     | TypeScript (strict)                         |
| ORM          | Prisma 7 with `@prisma/adapter-pg`          |
| Database     | PostgreSQL 16                               |
| Cache/Broker | Redis 7                                     |
| Validation   | Zod &middot; `nestjs-zod` &middot; `zod-prisma-types` |
| Testing      | Jest                                        |
| Infra (dev)  | Docker Compose                              |
| Infra (prod) | AWS (planned)                               |

---

## Prerequisites

- **Node.js** 22+
- **Docker** &amp; **Docker Compose**

---

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Start Postgres + Redis
docker compose up -d

# 3. Create your .env (see .env example below)

# 4. Apply migrations + generate Prisma client and Zod schemas
npx prisma migrate dev

# 5. Run the API in watch mode
npm run start:dev
```

Example `.env`:

```env
PORT=9999
DATABASE_URL="postgresql://ahmad:ASKsome123@localhost:4444/sadaf?schema=public"
```

---

## Scripts

```bash
npm run start:dev           # watch mode
npm run build               # compile to dist/
npm run start:prod          # run compiled
npm run test                # unit tests
npm run test:e2e            # e2e tests
npm run lint                # eslint --fix
npm run format              # prettier --write

npx prisma migrate dev      # apply schema changes locally
npx prisma generate         # regenerate Prisma client + Zod schemas
npx prisma studio           # DB GUI on http://localhost:5555
```

---

## Conventions

- **Modular monolith first.** Microservice split planned once boundaries are proven.
- **One class per file.** `kebab-case.ts` filenames, `PascalCase` class names.
- **Zod at the boundary.** DTOs derive types from the Prisma model schema where possible — Zod is the single source of truth for HTTP input validation.
- **Layered access.** Controllers don&rsquo;t touch Prisma; they call services. Services own DB access and business rules.
- **Money as integers.** Prices are stored as `priceCents: Int` to avoid floating-point bugs.

---

## License

UNLICENSED — internal project.

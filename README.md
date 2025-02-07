# Hono.js OpenAPI

Starter template with a _CRUD_ functionality and type-safe, using [scalar](https://scalar.com/#api-docs) and [OpenAPI](https://www.openapis.org/what-is-openapi)

Project reference [here](https://github.com/w3cj/hono-open-api-starter) and all credits to the author.

## Included

- Structured console logging with [pino](https://getpino.io/) / [hono-pino](https://www.npmjs.com/package/hono-pino)
- Documented / type-safe routes with [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- Interactive API documentation with [scalar](https://scalar.com/#api-docs) / [@scalar/hono-api-reference](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference)
- Convenience methods / helpers to reduce boilerplate with [stoker](https://www.npmjs.com/package/stoker)
- Type-safe schemas and environment variables with [zod](https://zod.dev/)
- Single source of truth database schemas with [drizzle](https://orm.drizzle.team/docs/overview) and [drizzle-zod](https://orm.drizzle.team/docs/zod)
- Testing with [vitest](https://vitest.dev/)
- Sensible editor, formatting and linting settings with [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## Setup

Install dependencies

```
bun install
```

Create SQLite database / push schema

```
bun drizzle-kit generate
bun drizzle-kit push
```

View database in drizzle studio

```
bun drizzle-kit studio
```

Start development server

```
bun run dev
```

Open in browser

```
http://localhost:3002/reference
```

Check format and linting with [Biome.js](https://biomejs.dev)

```
bun run check
```

Testing with vitest

```
bun run test
```

## Endpoints

| Path               | Description              |
| ------------------ | ------------------------ |
| GET /doc           | Open API Specification   |
| GET /reference     | Scalar API Documentation |
| GET /tasks         | List all tasks           |
| POST /tasks        | Create a task            |
| GET /tasks/{id}    | Get one task by id       |
| PATCH /tasks/{id}  | Patch one task by id     |
| DELETE /tasks/{id} | Delete one task by id    |

## References

- [What is Open API?](https://swagger.io/docs/specification/v3_0/about/)
- [Hono](https://hono.dev/)
  - [Zod OpenAPI Example](https://hono.dev/examples/zod-openapi)
  - [Testing](https://hono.dev/docs/guides/testing)
  - [Testing Helper](https://hono.dev/docs/helpers/testing)
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- [Scalar Documentation](https://github.com/scalar/scalar/tree/main/?tab=readme-ov-file#documentation)
  - [Themes / Layout](https://github.com/scalar/scalar/blob/main/documentation/themes.md)
  - [Configuration](https://github.com/scalar/scalar/blob/main/documentation/configuration.md)
- [Biome.js](https://biomejs.dev/guides/getting-started/)

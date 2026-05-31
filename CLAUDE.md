# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack Todo app: a Spring Boot REST API backend (`springboot-todo-api/`) and a vanilla JS frontend (`todo-vanilla-js/`). The backend runs on port 8081; the frontend is served as static files (open HTML directly or use VS Code Live Server).

## Backend Commands

All commands run from `springboot-todo-api/`:

```bash
# Run the app
./mvnw spring-boot:run        # Linux/Mac
mvnw.cmd spring-boot:run      # Windows

# Build (skip tests)
./mvnw package -DskipTests

# Run all tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=DemoversionApplicationTests
```

## Database Setup

PostgreSQL is required. Default config in `application.properties`:
- Database: `todosdb`
- Username: `postgres`
- Password: `1234`
- Port: `5432`

Schema is auto-managed via `spring.jpa.hibernate.ddl-auto=update`. The `User` entity maps to a table named `UserTable` (not `user`, which is a reserved word in PostgreSQL).

## Architecture

### Auth Flow

1. `POST /auth/register` or `POST /auth/login` — handled by `AuthController`, no JWT required (permitted in `SecurityConfig`)
2. Login returns a JWT token signed with a hardcoded secret in `JwtUtil`; token expires in **60 seconds** (`EXPIRATION = 1000 * 60`)
3. All `/api/v1/**` requests pass through `JwtFilter`, which extracts the email from the token and populates `SecurityContextHolder`
4. Controllers read the authenticated user's email via `SecurityContextHolder.getContext().getAuthentication().getName()`

### User Isolation

Todos are owned by users via a `@ManyToOne` relationship (`Todo.user`). `TodoController` always resolves the current user from `SecurityContextHolder` before querying or creating todos — never trust the user ID from the request body for ownership.

### Key Design Decisions

- `AuthController` is mapped to `/auth/**` (not `/api/v1/auth/**`) — this is intentional; the security permit-all rule uses `/auth/**`
- The JWT secret is hardcoded in `JwtUtil.java`. For any production use, move it to `application.properties` or an environment variable
- Token expiry is 60 seconds — very short, suitable for local dev/demo but would need to be extended for real use
- CORS is open (`allowedOrigins: *`) since the frontend is served as static files without a dedicated origin

### Frontend

`todo-vanilla-js/script.js` is a single shared script included by all three HTML pages. It uses `document.getElementById` checks to determine which page-specific logic to run. The `SERVER_URL` constant is hardcoded to `http://localhost:8081`.

## API Reference

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/auth/register` | No | Body: `{email, password}` |
| POST | `/auth/login` | No | Returns `{token}` |
| GET | `/api/v1/todo` | Bearer | Returns all todos for current user |
| POST | `/api/v1/todo/create` | Bearer | Body: `{title, description, isCompleted}` |
| PUT | `/api/v1/todo` | Bearer | Full todo object including `id` |
| DELETE | `/api/v1/todo/{id}` | Bearer | |
| GET | `/api/v1/todo/page` | Bearer | Params: `?page=0&size=10` |

Swagger UI: `http://localhost:8081/swagger-ui/index.html`

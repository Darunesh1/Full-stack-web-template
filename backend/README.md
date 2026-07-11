# FastAPI Backend Template

A robust, production-ready, reusable backend template utilizing **FastAPI**, **PostgreSQL** (via SQLAlchemy 2.0 and asyncpg), **Redis**, and **Celery**, fully containerized via **Docker** and managed using **uv**.

---

## Features
- **Modern Python Architecture**: Built with Python 3.13 and managed via `uv` (fast package installer and resolver).
- **FastAPI Framework**: High performance async routing, standard dependency injection, and automatic OpenAPI documentation.
- **Asynchronous ORM**: SQLAlchemy 2.0 async engine and session management using `asyncpg`.
- **Dynamic Database Creation**: On application startup in the development environment, checks if the database exists on the PostgreSQL host and creates it dynamically if missing.
- **Security & Authorization**: Safe password hashing utilizing `bcrypt` directly and JWT-based authentication (supporting short-lived access tokens and long-lived refresh tokens).
- **Background Tasks Queue**: Celery integration with Redis as the broker/result backend for asynchronous processing (e.g. email verification).
- **Clean Directory Structure**: Decoupled models, schemas, routers, tasks, services, and configuration.
- **Robust Test Suite**: Async API integration tests using `pytest`, `pytest-asyncio`, and `httpx` with transactional connection teardown.

---

## Directory Structure
```text
backend/
├── app/
│   ├── main.py               # Application entry point & FastAPI setup
│   ├── api/                  # API routers and dependencies
│   │   ├── deps.py           # Dependency injection (db, current_user, etc.)
│   │   ├── router.py         # Combines routers from endpoints
│   │   └── endpoints/
│   │       ├── auth.py       # Login, registration, token refresh, email verification
│   │       └── users.py      # User profile endpoints
│   ├── core/                 # App configurations (settings, db pool, security, celery)
│   ├── models/               # SQLAlchemy Models
│   ├── schemas/              # Pydantic validation schemas
│   ├── services/             # CRUD / Business logic layer
│   └── tasks/                # Celery background tasks
├── tests/                    # pytest integration and unit tests
├── Dockerfile                # Multi-stage container using uv
├── pyproject.toml            # Project configuration and dependencies
└── .env.example              # Sample environment variables
```

---

## Quick Start (Docker Environment)

### 1. Configure Environments
Copy the environment variables template and customize details:
```bash
cp .env.example .env
```

### 2. Spin Up Containers
Launch the database, redis cache, fastapi app server, and celery worker:
```bash
docker-compose up -d --build
```
This spins up:
- **`db`**: PostgreSQL server on port `5432` (healthchecked).
- **`redis`**: Redis broker on port `6379`.
- **`web`**: FastAPI backend reload server on port `8000`.
- **`celery_worker`**: Celery worker executing background tasks.

### 3. Access Documentation
Open your browser and navigate to:
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## Running the Test Suite

Execute the tests inside the running container context:
```bash
docker compose exec web pytest
```
Testing features:
- Uses a `NullPool` database connection to prevent event loop connection reuse conflicts.
- Wraps each test in a dedicated session and automatically executes a clean-up query (`DELETE FROM users`) during teardown.
- Mocks Celery task dispatches to verify background jobs without requiring actual worker completion.

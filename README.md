# Full-stack Web Template

This repository contains a full-stack web application template. The codebase is divided into two primary folders: `frontend` (FE) and `backend` (BE).

---

## 1. Frontend (FE)
*(This section is left blank for the Frontend Developer to document the setup and execution steps.)*

---

## 2. Backend (BE)
The backend is a FastAPI application featuring PostgreSQL (SQLAlchemy async ORM), Redis, and Celery background tasks, built and managed using `uv`.

### How to Run the Application

#### A. Using Docker (Recommended for Containerized Run)
1. Copy the sample environment file inside the `backend` directory:
   ```bash
   cp backend/.env.example backend/.env
   ```
2. Build and start the services (FastAPI, Celery worker, PostgreSQL, Redis) from the project root:
   ```bash
   docker-compose up -d --build
   ```
   - **FastAPI Server**: [http://localhost:8000](http://localhost:8000)
   - **API Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

#### B. Running Locally (For Native Python Run)
1. Make sure you have `uv` installed. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Copy the sample environment variables file and configure it:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and set up the virtual environment:
   ```bash
   uv sync
   ```
4. Start the FastAPI development server:
   ```bash
   uv run uvicorn app.main:app --reload
   ```
5. In a separate terminal, start the Celery worker task queue:
   ```bash
   uv run celery -A app.core.celery_app worker --loglevel=info
   ```

---

### Running the Test Suite
Tests are built using `pytest`, `pytest-asyncio`, and `httpx`.

- **To run inside Docker**:
  ```bash
  docker compose exec web pytest
  ```
- **To run locally**:
  ```bash
  cd backend && uv run pytest
  ```

---

### Backend Directory Structure
```text
backend/
├── app/
│   ├── main.py               # FastAPI application loader and lifespan startup
│   ├── api/                  # Authentication & Profile routing and dependencies
│   ├── core/                 # Settings, DB session creation, security helpers, and Celery app
│   ├── models/               # SQLAlchemy ORM model definitions (e.g. User)
│   ├── schemas/              # Pydantic schemas for input validation and output representation
│   ├── services/             # CRUD database helper functions
│   └── tasks/                # Background tasks (e.g. email verification tasks)
└── tests/                    # API integration tests and unit tests
```
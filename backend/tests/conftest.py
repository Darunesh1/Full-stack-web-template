import asyncio
from typing import AsyncGenerator, Generator
import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.core.database import Base, async_session_maker, engine
from app.main import app





@pytest.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Yields an AsyncSession wrapped in a rollback transaction for test isolation."""
    async with engine.connect() as connection:
        transaction = await connection.begin()
        async with AsyncSession(
            bind=connection, expire_on_commit=False
        ) as session:
            yield session
        # Rollback all operations carried out during the test
        await transaction.rollback()


@pytest.fixture
async def client(
    db_session: AsyncSession,
) -> AsyncGenerator[AsyncClient, None]:
    """Yields a test client with get_db dependency overridden to use the transactional session."""

    async def _override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = _override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest.fixture
def mock_emails(monkeypatch):
    """Mocks Celery delay methods for email tasks to check if they were called."""
    from app.tasks.email_tasks import send_verification_email, send_welcome_email

    calls = {"verification_emails": [], "welcome_emails": []}

    def mock_verification_delay(*args, **kwargs):
        calls["verification_emails"].append((args, kwargs))
        return None

    def mock_welcome_delay(*args, **kwargs):
        calls["welcome_emails"].append((args, kwargs))
        return None

    monkeypatch.setattr(send_verification_email, "delay", mock_verification_delay)
    monkeypatch.setattr(send_welcome_email, "delay", mock_welcome_delay)

    return calls

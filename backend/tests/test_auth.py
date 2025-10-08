import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.core.database import Base, get_db

# Test database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


client = TestClient(app)


class TestAuth:
    def test_register_user(self):
        """Test user registration."""
        response = client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "password123",
                "full_name": "Test User"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    def test_register_duplicate_email(self):
        """Test registering with duplicate email fails."""
        # Register first user
        client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "password123"
            }
        )

        # Try to register again with same email
        response = client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "password456"
            }
        )

        assert response.status_code == 400
        assert "already registered" in response.json()["detail"].lower()

    def test_login_success(self):
        """Test successful login."""
        # Register user
        client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "password123"
            }
        )

        # Login
        response = client.post(
            "/api/auth/login",
            json={
                "email": "test@example.com",
                "password": "password123"
            }
        )

        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data

    def test_login_wrong_password(self):
        """Test login with wrong password fails."""
        # Register user
        client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "password123"
            }
        )

        # Try to login with wrong password
        response = client.post(
            "/api/auth/login",
            json={
                "email": "test@example.com",
                "password": "wrongpassword"
            }
        )

        assert response.status_code == 401

    def test_login_nonexistent_user(self):
        """Test login with nonexistent user fails."""
        response = client.post(
            "/api/auth/login",
            json={
                "email": "notfound@example.com",
                "password": "password123"
            }
        )

        assert response.status_code == 401

    def test_protected_endpoint_without_token(self):
        """Test accessing protected endpoint without token fails."""
        response = client.get("/api/transactions")

        assert response.status_code == 403

    def test_protected_endpoint_with_token(self):
        """Test accessing protected endpoint with valid token."""
        # Register and get token
        register_response = client.post(
            "/api/auth/register",
            json={
                "email": "test@example.com",
                "password": "password123"
            }
        )
        token = register_response.json()["access_token"]

        # Access protected endpoint
        response = client.get(
            "/api/transactions",
            headers={"Authorization": f"Bearer {token}"}
        )

        assert response.status_code == 200

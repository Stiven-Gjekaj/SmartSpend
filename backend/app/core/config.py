from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartSpend"
    VERSION: str = "1.0.0"

    DATABASE_URL: str = "postgresql://smartspend:smartspend123@postgres:5432/smartspend"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    JWT_SECRET_KEY: str = "jwt-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    UPLOAD_DIR: str = "/app/uploads"
    MAX_UPLOAD_SIZE_MB: int = 20

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

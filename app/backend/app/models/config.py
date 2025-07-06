import os
from pathlib import Path
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env file from the backend directory
BACKEND_DIR = Path(__file__).parent.parent.parent
ENV_FILE = BACKEND_DIR / ".env"
load_dotenv(ENV_FILE)

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    APP_NAME: str = os.getenv("APP_NAME", "Project Odyssey API")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"

settings = Settings()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, auth, chat
from app.database.database import engine, Base
from app.models import user, chat as chat_model
from dotenv import load_dotenv

load_dotenv()

# Force recreate tables to ensure schema consistency
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Athena API",
    description="A FastAPI backend application for Athena",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "https://yourusername.github.io",  # Replace with your GitHub username
        "https://yourusername.github.io/project-odyssey"  # Replace with your GitHub username
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Athena API", "docs": "/docs"}

app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api/v1", tags=["chat"])